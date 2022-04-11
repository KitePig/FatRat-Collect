<?php

namespace Socket\Raw;

use \InvalidArgumentException;

class Factory
{
    /**
     * create client socket connected to given target address
     *
     * @param string     $address target address to connect to
     * @param null|float $timeout connection timeout (in seconds), default null = no limit
     * @return \Socket\Raw\Socket
     * @throws InvalidArgumentException if given address is invalid
     * @throws Exception on error
     * @uses self::createFromString()
     * @uses Socket::connect()
     * @uses Socket::connectTimeout()
     */
    public function createClient($address, $timeout = null)
    {
        $socket = $this->createFromString($address, $scheme);

        try {
            if ($timeout === null) {
                $socket->connect($address);
            } else {
                // connectTimeout enables non-blocking mode, so turn blocking on again
                $socket->connectTimeout($address, $timeout);
                $socket->setBlocking(true);
            }
        } catch (Exception $e) {
            $socket->close();
            throw $e;
        }

        return $socket;
    }

    /**
     * create server socket bound to given address (and start listening for streaming clients to connect to this stream socket)
     *
     * @param string $address address to bind socket to
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::createFromString()
     * @uses Socket::bind()
     * @uses Socket::listen() only for stream sockets (TCP/UNIX)
     */
    public function createServer($address)
    {
        $socket = $this->createFromString($address, $scheme);

        try {
            $socket->bind($address);

            if ($socket->getType() === SOCK_STREAM) {
                $socket->listen();
            }
        } catch (Exception $e) {
            $socket->close();
            throw $e;
        }

        return $socket;
    }

    /**
     * create TCP/IPv4 stream socket
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createTcp4()
    {
        return $this->create(AF_INET, SOCK_STREAM, SOL_TCP);
    }

    /**
     * create TCP/IPv6 stream socket
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createTcp6()
    {
        return $this->create(AF_INET6, SOCK_STREAM, SOL_TCP);
    }

    /**
     * create UDP/IPv4 datagram socket
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createUdp4()
    {
        return $this->create(AF_INET, SOCK_DGRAM, SOL_UDP);
    }

    /**
     * create UDP/IPv6 datagram socket
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createUdp6()
    {
        return $this->create(AF_INET6, SOCK_DGRAM, SOL_UDP);
    }

    /**
     * create local UNIX stream socket
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createUnix()
    {
        return $this->create(AF_UNIX, SOCK_STREAM, 0);
    }

    /**
     * create local UNIX datagram socket (UDG)
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createUdg()
    {
        return $this->create(AF_UNIX, SOCK_DGRAM, 0);
    }

    /**
     * create raw ICMP/IPv4 datagram socket (requires root!)
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createIcmp4()
    {
        return $this->create(AF_INET, SOCK_RAW, getprotobyname('icmp'));
    }

    /**
     * create raw ICMPv6 (IPv6) datagram socket (requires root!)
     *
     * @return \Socket\Raw\Socket
     * @throws Exception on error
     * @uses self::create()
     */
    public function createIcmp6()
    {
        return $this->create(AF_INET6, SOCK_RAW, 58 /*getprotobyname('icmp')*/);
    }

    /**
     * create low level socket with given arguments
     *
     * @param int $domain
     * @param int $type
     * @param int $protocol
     * @return \Socket\Raw\Socket
     * @throws Exception if creating socket fails
     * @throws \Error PHP 8 only: throws \Error when arguments are invalid
     * @uses socket_create()
     */
    public function create($domain, $type, $protocol)
    {
        $sock = @socket_create($domain, $type, $protocol);
        if ($sock === false) {
            throw Exception::createFromGlobalSocketOperation('Unable to create socket');
        }
        return new Socket($sock);
    }

    /**
     * create a pair of indistinguishable sockets (commonly used in IPC)
     *
     * @param int $domain
     * @param int $type
     * @param int $protocol
     * @return \Socket\Raw\Socket[]
     * @throws Exception if creating pair of sockets fails
     * @throws \Error PHP 8 only: throws \Error when arguments are invalid
     * @uses socket_create_pair()
     */
    public function createPair($domain, $type, $protocol)
    {
        $ret = @socket_create_pair($domain, $type, $protocol, $pair);
        if ($ret === false) {
            throw Exception::createFromGlobalSocketOperation('Unable to create pair of sockets');
        }
        return array(new Socket($pair[0]), new Socket($pair[1]));
    }

    /**
     * create TCP/IPv4 stream socket and listen for new connections
     *
     * @param int $port
     * @param int $backlog
     * @return \Socket\Raw\Socket
     * @throws Exception if creating listening socket fails
     * @throws \Error PHP 8 only: throws \Error when arguments are invalid
     * @uses socket_create_listen()
     * @see self::createServer() as an alternative to bind to specific IP, IPv6, UDP, UNIX, UGP
     */
    public function createListen($port, $backlog = 128)
    {
        $sock = @socket_create_listen($port, $backlog);
        if ($sock === false) {
            throw Exception::createFromGlobalSocketOperation('Unable to create listening socket');
        }
        return new Socket($sock);
    }

    /**
     * create socket for given address
     *
     * @param string $address (passed by reference in order to remove scheme, if present)
     * @param string $scheme  default scheme to use, defaults to TCP (passed by reference in order to update with actual scheme used)
     * @return \Socket\Raw\Socket
     * @throws InvalidArgumentException if given address is invalid
     * @throws Exception in case creating socket failed
     * @uses self::createTcp4() etc.
     */
    public function createFromString(&$address, &$scheme)
    {
        if ($scheme === null) {
            $scheme = 'tcp';
        }

        $hasScheme = false;

        $pos = strpos($address, '://');
        if ($pos !== false) {
            $scheme = substr($address, 0, $pos);
            $address = substr($address, $pos + 3);
            $hasScheme = true;
        }

        if (strpos($address, ':') !== strrpos($address, ':') && in_array($scheme, array('tcp', 'udp', 'icmp'))) {
            // TCP/UDP/ICMP address with several colons => must be IPv6
            $scheme .= '6';
        }

        if ($scheme === 'tcp') {
            $socket = $this->createTcp4();
        } elseif ($scheme === 'udp') {
            $socket = $this->createUdp4();
        } elseif ($scheme === 'tcp6') {
            $socket = $this->createTcp6();
        } elseif ($scheme === 'udp6') {
            $socket = $this->createUdp6();
        } elseif ($scheme === 'unix') {
            $socket = $this->createUnix();
        } elseif ($scheme === 'udg') {
            $socket = $this->createUdg();
        } elseif ($scheme === 'icmp') {
            $socket = $this->createIcmp4();
        } elseif ($scheme === 'icmp6') {
            $socket = $this->createIcmp6();
            if ($hasScheme) {
                // scheme was stripped from address, resulting IPv6 must not
                // have a port (due to ICMP) and thus must not be enclosed in
                // square brackets
                $address = trim($address, '[]');
            }
        } else {
            throw new InvalidArgumentException('Invalid address scheme given');
        }
        return $socket;
    }
}
