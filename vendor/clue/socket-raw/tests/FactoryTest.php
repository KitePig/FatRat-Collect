<?php

use PHPUnit\Framework\TestCase;
use Socket\Raw\Factory;
use Socket\Raw\Socket;

class FactoryTest extends TestCase
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

    /**
     * @doesNotPerformAssertions
     */
    public function testSupportsIpv6()
    {
        static $available = null;
        if ($available === null) {
            $test = @stream_socket_client('udp://[::1]:0');
            if ($test === false) {
                $available = false;
            } else {
                fclose($test);
                $available = true;
            }
        }

        if (!$available) {
            $this->markTestSkipped('This system does not seem to support IPv6 sockets / addressing');
        }
    }

    /**
     * @doesNotPerformAssertions
     */
    public function testSupportsUnix()
    {
        if (!defined('AF_UNIX')) {
            $this->markTestSkipped('This system does not seem to support UNIX and UDG sockets');
        }
    }

    public function testConstructorWorks()
    {
        $this->assertInstanceOf('Socket\Raw\Factory', $this->factory);
    }

    /** @group internet */
    public function testCreateClientTcp4()
    {
        $socket = $this->factory->createClient('tcp://www.google.com:80');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /** @group internet */
    public function testCreateClientSchemelessTcp4()
    {
        $socket = $this->factory->createClient('www.google.com:80');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /** @group internet */
    public function testCreateClientWithReasonableTimeoutShouldSuccess()
    {
        $socket = $this->factory->createClient('www.google.com:80', 5.0);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /** @group internet */
    public function testCreateClientWithSmallTimeoutToUnboundPortTimesOut()
    {
        $this->setExpectedException('Socket\Raw\Exception', null, SOCKET_ETIMEDOUT);
        $this->factory->createClient('www.google.com:81', 0.001);
    }

    /**
     * the target address should not be bound, so connecting via TCP should fail
     *
     * @see self::testCreateClientUdp4UnboundWorks()
     * @doesNotPerformAssertions
     */
    public function testCreateClientTcp4UnboundFails()
    {
        try {
            $this->factory->createClient('tcp://localhost:2');
        } catch (Exception $e) {
            if ($e->getCode() === SOCKET_ECONNREFUSED) {
                return;
            }
        }

        $this->fail('Expected to be unable to connect to localhost:2');
    }

    /** @group internet */
    public function testCreateClientUdp4()
    {
        $socket = $this->factory->createClient('udp://8.8.8.8:53');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * the target address should not be bound, but "connecting" via UDP works nevertheless
     *
     * @see self::testCreateClientTcp4UnboundFails()
     */
    public function testCreateClientUdp4UnboundWorks()
    {
        $socket = $this->factory->createClient('udp://localhost:3');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsIpv6
     */
    public function testCreateClientUdp6UnboundWorks()
    {
        $socket = $this->factory->createClient('udp://[::1]:3');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    public function testCreateServerTcp4Random()
    {
        $socket = $this->factory->createServer('tcp://localhost:0');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    public function testCreateServerSchemelessTcp4Random()
    {
        $socket = $this->factory->createServer('localhost:0');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    public function testCreateServerUdp4Random()
    {
        $socket = $this->factory->createServer('udp://localhost:0');

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsUnix
     */
    public function testCreateServerUnix()
    {
        if (DIRECTORY_SEPARATOR !== '\\') {
            $path = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'test-' . md5(microtime(true)) . '.sock';
        } else {
            // create test socket in local directory on Windows
            $path = 'test-' . md5(microtime(true)) . '.sock';
        }

        $socket = $this->factory->createServer('unix://' . $path);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);

        $this->assertTrue(unlink($path), 'Unable to remove temporary socket ' . $path);
    }

    /**
     * @depends testSupportsUnix
     * @doesNotPerformAssertions
     */
    public function testCreateServerUnixFailInvalidPath()
    {
        $path = '/a/path/that/can/not/be/bound/to.sock';

        try {
            $this->factory->createServer('unix://' . $path);
        } catch (Exception $e) {
            return;
        }

        $this->fail('Expected to fail on invalid path');
    }

    /**
     * @depends testSupportsUnix
     */
    public function testCreateServerUdg()
    {
        if (DIRECTORY_SEPARATOR === '\\') {
            // https://blogs.msdn.microsoft.com/commandline/2017/12/19/af_unix-comes-to-windows/
            $this->markTestSkipped('Unix datagram sockets not supported on Windows');
        }

        $path = '/tmp/randomfactorytests.sock';

        $socket = $this->factory->createServer('udg://' . $path);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);

        unlink($path);
    }

    public function testCreateServerIcmp4()
    {
        try {
            $socket = $this->factory->createServer('icmp://0.0.0.0');
        } catch (Exception $e) {
            if ($e->getCode() === SOCKET_EPERM) {
                // skip if not root
                return $this->markTestSkipped('No access to ICMPv4 socket (only root can do so)');
            }
            throw $e;
        }

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsIpv6
     */
    public function testCreateServerIcmp6()
    {
        try {
            $socket = $this->factory->createServer('icmp6://[::1]');
        } catch (Exception $e) {
            if ($e->getCode() === SOCKET_EPERM) {
                // skip if not root
                return $this->markTestSkipped('No access to ICMPv6 socket (only root can do so)');
            }
            throw $e;
        }

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    public function testCreateTcp4()
    {
        $socket = $this->factory->createTcp4();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsIpv6
     */
    public function testCreateTcp6()
    {
        $socket = $this->factory->createTcp6();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    public function testCreateUdp4()
    {
        $socket = $this->factory->createUdp4();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsIpv6
     */
    public function testCreateUdp6()
    {
        $socket = $this->factory->createUdp6();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsUnix
     */
    public function testCreateUnix()
    {
        $socket = $this->factory->createUnix();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsUnix
     */
    public function testCreateUdg()
    {
        if (DIRECTORY_SEPARATOR === '\\') {
            // https://blogs.msdn.microsoft.com/commandline/2017/12/19/af_unix-comes-to-windows/
            $this->markTestSkipped('Unix datagram sockets not supported on Windows');
        }

        $socket = $this->factory->createUdg();

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    public function testCreateIcmp4()
    {
        try {
            $socket = $this->factory->createIcmp4();
        } catch (Exception $e) {
            if ($e->getCode() === SOCKET_EPERM) {
                // skip if not root
                return $this->markTestSkipped('No access to ICMPv4 socket (only root can do so)');
            }
            throw $e;
        }

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @depends testSupportsIpv6
     */
    public function testCreateIcmp6()
    {
        try {
            $socket = $this->factory->createIcmp6();
        } catch (Exception $e) {
            if ($e->getCode() === SOCKET_EPERM) {
                // skip if not root
                return $this->markTestSkipped('No access to ICMPv6 socket (only root can do so)');
            }
            throw $e;
        }

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    /**
     * @dataProvider provideCreateArguments
     */
    public function testCreate($domain, $type, $protocol)
    {
        $socket = $this->factory->create($domain, $type, $protocol);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
    }

    public static function provideCreateArguments()
    {
        // only return TCP/IP and UDP/IP as the above tests should already cover other sockets
        return array(
            array(AF_INET, SOCK_STREAM, SOL_TCP),
            array(AF_INET, SOCK_DGRAM, SOL_UDP)
        );
    }

    /**
     * @doesNotPerformAssertions
     */
    public function testCreateInvalid()
    {
        try {
            $this->factory->create(0, 1, 2);
        } catch (Exception $e) {
            return;
        }
        $this->fail();
    }

    /**
     * @depends testSupportsUnix
     */
    public function testCreatePair()
    {
        if (DIRECTORY_SEPARATOR === '\\') {
            $this->markTestSkipped('Unix socket pair not supported on Windows');
        }

        $sockets = $this->factory->createPair(AF_UNIX, SOCK_STREAM, 0);

        $this->assertCount(2, $sockets);
        $this->assertInstanceOf('Socket\Raw\Socket', $sockets[0]);
        $this->assertInstanceOf('Socket\Raw\Socket', $sockets[1]);
    }

    /**
     * @doesNotPerformAssertions
     */
    public function testCreatePairInvalid()
    {
        try {
            $this->factory->createPair(0, 1, 2);
        } catch (Exception $e) {
            return;
        }
        $this->fail();
    }

    public function testCreateListenRandom()
    {
        // listen on a random free port
        $socket = $this->factory->createListen(0);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);

        return $socket;
    }

    /**
     *
     * @param Socket $socket
     * @depends testCreateListenRandom
     * @expectedException Exception
     */
    public function testCreateListenInUseFails(Socket $socket)
    {
        $address = $socket->getSockName();
        $port = substr($address, strrpos($address, ':') + 1);

        $this->factory->createListen($port);
    }

    public function testCreateFromStringTcp4()
    {
        $address = 'tcp://127.0.0.1:80';
        $socket = $this->factory->createFromString($address, $scheme);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
        $this->assertEquals('127.0.0.1:80', $address);
        $this->assertEquals('tcp', $scheme);
    }

    /**
     * assume default scheme 'tcp'
     */
    public function testCreateFromStringSchemelessTcp4()
    {
        $address = '127.0.0.1:80';
        $socket = $this->factory->createFromString($address, $scheme);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
        $this->assertEquals('127.0.0.1:80', $address);
        $this->assertEquals('tcp', $scheme);
    }

    /**
     * scheme is actually 'tcp6' for IPv6 addresses
     *
     * @depends testSupportsIpv6
     */
    public function testCreateFromStringTcp6()
    {
        $address = 'tcp://[::1]:80';
        $socket = $this->factory->createFromString($address, $scheme);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
        $this->assertEquals('[::1]:80', $address);
        $this->assertEquals('tcp6', $scheme);
    }

    /**
     * assume scheme 'tcp6' for IPv6 addresses
     *
     * @depends testSupportsIpv6
     */
    public function testCreateFromStringSchemelessTcp6()
    {
        $address = '[::1]:80';
        $socket = $this->factory->createFromString($address, $scheme);

        $this->assertInstanceOf('Socket\Raw\Socket', $socket);
        $this->assertEquals('[::1]:80', $address);
        $this->assertEquals('tcp6', $scheme);
    }

    /**
     * creating socket for invalid scheme should fail
     *
     * @doesNotPerformAssertions
     */
    public function testCreateFromStringInvalid()
    {
        $address = 'invalid://whatever';
        try {
            $this->factory->createFromString($address, $scheme);
        } catch (Exception $e) {
            return;
        }
        $this->fail('Creating socket for invalid scheme should fail');
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
