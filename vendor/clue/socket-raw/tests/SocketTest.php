<?php

use PHPUnit\Framework\TestCase;
use Socket\Raw\Socket;
use Socket\Raw\Factory;

class SocketTest extends TestCase
{
    /**
     * @var Socket\Raw\Factory
     * @type Factory
     */
    protected $factory;

    public function setUp()
    {
        $this->factory = new Factory();
    }

    /** @group internet */
    public function testConnectGoogle()
    {
        $socket = $this->factory->createClient('www.google.com:80');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
        $this->assertEquals('resource', gettype($socket->getResource()));

        // connecting from local address:
        $address = $socket->getSockName();
        $this->assertNotEmpty($address);

        // connected to remote/peer address:
        $address = $socket->getPeerName();
        $this->assertNotEmpty($address);

        // expect to be writable right away
        $this->assertTrue($socket->selectWrite());

        // send HTTP request to remote server
        $data = "GET / HTTP/1.1\r\nHost: www.google.com\r\n\r\n";
        $this->assertEquals(strlen($data), $socket->write($data));

        // signal we're ready with writing to this socket
        $this->assertSame($socket, $socket->shutdown(1));

        // expect to get a readable result within 10 seconds
        $this->assertTrue($socket->selectRead(10.0));

        // read just 4 bytes
        $this->assertEquals('HTTP', $socket->read(4));

        // expect there's more data in the socket
        $this->assertTrue($socket->selectRead());

        // read a whole chunk from socket
        $this->assertNotEmpty($socket->read(8192));

        $this->assertSame($socket, $socket->close());
    }

    public function testConnectFailUnbound()
    {
        try {
            $this->factory->createClient('localhost:2');
            $this->fail('Expected connection to fail');
        } catch (Exception $e) {
            $this->assertEquals(SOCKET_ECONNREFUSED, $e->getCode());
        }
    }

    /** @group internet */
    public function testConnectAsyncGoogle()
    {
        $socket = $this->factory->createTcp4();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);

        $this->assertSame($socket, $socket->bind('0:0'));

        $this->assertSame($socket, $socket->setBlocking(false));

        try {
            $this->assertSame($socket, $socket->connect('www.google.com:80'));
            $this->fail('Calling connect() succeeded immediately');
        } catch (Exception $e) {
            // non-blocking connect() should be EINPROGRESS or EWOULDBLOCK on Windows
            $this->assertEquals(
                DIRECTORY_SEPARATOR !== '\\' ? SOCKET_EINPROGRESS : SOCKET_EWOULDBLOCK,
                $e->getCode()
            );

            // connection should be established within 5.0 seconds
            $this->assertTrue($socket->selectWrite(5.0));

            // confirm connection success
            $this->assertSame($socket, $socket->assertAlive());
        }

        $this->assertSame($socket, $socket->close());
    }

    public function testConnectAsyncFailUnbound()
    {
        if (PHP_OS !== 'Linux') {
            $this->markTestSkipped('Only Linux is known to refuse connections to unbound addresses');
        }

        $socket = $this->factory->createTcp4();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);

        $this->assertSame($socket, $socket->setBlocking(false));

        try {
            $this->assertSame($socket, $socket->connect('localhost:2'));
            $this->fail('Calling connect() succeeded immediately');
        } catch (Exception $e) {
            // non-blocking connect() should be EINPROGRESS
            $this->assertEquals(SOCKET_EINPROGRESS, $e->getCode());

            // connection should be rejected within 5.0 seconds
            $this->assertTrue($socket->selectWrite(5.0));

            // confirm connection success (should reject)
            try {
                $socket->assertAlive();
                $this->fail('Calling connect() succeeded');
            }
            catch (Exception $e) {
                $this->assertEquals(SOCKET_ECONNREFUSED, $e->getCode());
            }
        }

        $this->assertSame($socket, $socket->close());
    }

    /** @group internet */
    public function testSelectFloat()
    {
        $socket = $this->factory->createClient('google.com:80');

        $time = microtime(true);
        $this->assertFalse($socket->selectRead(0.5));
        $time = microtime(true) - $time;

        // check timer interval, but add some grace time to cope with inaccurate timers
        $this->assertGreaterThan(0.48, $time);
        $this->assertLessThan(1.0, $time);
    }

    /** @group internet */
    public function testConnectTimeoutGoogle()
    {
        $socket = $this->factory->createTcp4();

        $this->assertSame($socket, $socket->connectTimeout('google.com:80', 10.0));

        $socket->close();
    }

    /**
     * @group internet
     * @doesNotPerformAssertions
     */
    public function testConnectTimeoutUdpImmediately()
    {
        $socket = $this->factory->createUdp4();

        $socket->connectTimeout('google.com:8000', 10);
    }

    /** @group internet */
    public function testConnectTimeoutFailTimeout()
    {
        $socket = $this->factory->createTcp4();

        $this->setExpectedException('Socket\Raw\Exception', null, SOCKET_ETIMEDOUT);

        $socket->connectTimeout('default.com:81', 0.001);
    }

    public function testConnectTimeoutFailUnbound()
    {
        if (PHP_OS !== 'Linux') {
            $this->markTestSkipped('Only Linux is known to refuse connections to unbound addresses');
        }

        $socket = $this->factory->createTcp4();

        $this->setExpectedException('Socket\Raw\Exception', null, SOCKET_ECONNREFUSED);

        $socket->connectTimeout('localhost:2', 0.5);
    }

    /** @group internet */
    public function testConnectTimeoutFailAlreadyConnected()
    {
        $socket = $this->factory->createClient('google.com:80');

        $this->setExpectedException('Socket\Raw\Exception', null, SOCKET_EISCONN);

        $socket->connectTimeout('google.com:8000', 10);
    }

    public function testServerNonBlocking()
    {
        // bind to random port
        $server = $this->factory->createListen(0);

        $this->assertSame($server, $server->setBlocking(false));

        return $server;
    }

    /**
     * @depends testServerNonBlocking
     */
    public function testServerNonBlockingAcceptNobody(Socket $server)
    {
        try {
            $server->accept();
            $this->fail('accept() MUST throw an exception');
        } catch (Exception $e) {
            // code should usually be SOCKET_EAGAIN, hhvm uses SOCKET_EBADF, so let's play it safe
            $this->assertNotEquals(0, $e->getCode());
        }
    }

    /**
     * @depends testServerNonBlocking
     */
    public function testServerNonBlockingAcceptClient(Socket $server)
    {
        // create local client connected to the given server
        $client = $this->factory->createClient($server->getSockName());

        // client connected, so we should be able to accept() this socket immediately
        // on Windows, there appears to be a race condition, so first wait for server to be ready
        $server->selectRead(0.1);
        $peer = $server->accept();

        // peer should be writable right away
        $this->assertTrue($peer->selectWrite(0.1));
        $peer->write('test');

        // expect to receive the message in one chunk
        $this->assertEquals('test', $client->read(100));

        // disconnect local client
        $client->close();

        // disconnection should be detected withing 1s max
        $this->assertTrue($peer->selectRead(1.0));

        $peer->close();
    }

    public function testBindThrowsWhenSocketIsAlreadyClosed()
    {
        $socket = $this->factory->createTcp4();
        $socket->close();

        $this->setExpectedException('Socket\Raw\Exception', null, SOCKET_ENOTSOCK);
        $socket->bind('127.0.0.1:0');
    }

    public function testAssertAliveThrowsWhenSocketIsAlreadyClosed()
    {
        $socket = $this->factory->createTcp4();
        $socket->close();

        $this->setExpectedException('Socket\Raw\Exception', null, SOCKET_ENOTSOCK);
        $socket->assertAlive();
    }

    public function setExpectedException($exception, $message = '', $code = 0)
    {
        if (method_exists($this, 'expectException')) {
            $this->expectException($exception);
            if ($message !== null) {
                $this->expectExceptionMessage($message);
            }
            $this->expectExceptionCode($code);
        } else {
            parent::setExpectedException($exception, $message, $code);
        }
    }
}
