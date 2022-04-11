<?php

namespace Socket\Raw;

/**
 * Simple and lightweight OOP wrapper for the low-level sockets extension (ext-sockets)
 *
 * @author clue
 * @link https://github.com/clue/php-socket-raw
 */
class Socket
{
    /**
     * reference to actual socket resource
     *
     * @var \Socket|resource
     */
    private $resource;

    /**
     * instanciate socket wrapper for given socket resource
     *
     * should usually not be called manually, see Factory
     *
     * @param \Socket|resource $resource
     * @see Factory as the preferred (and simplest) way to construct socket instances
     */
    public function __construct($resource)
    {
        $this->resource = $resource;
    }

    /**
     * get actual socket resource
     *
     * @return \Socket|resource returns the socket resource (a `Socket` object as of PHP 8)
     */
    public function getResource()
    {
        return $this->resource;
    }

    /**
     * accept an incomming connection on this listening socket
     *
     * @return \Socket\Raw\Socket new connected socket used for communication
     * @throws Exception on error, if this is not a listening socket or there's no connection pending
     * @throws \Error PHP 8 only: throws \Error when socket is invalid
     * @see self::selectRead() to check if this listening socket can accept()
     * @see Factory::createServer() to create a listening socket
     * @see self::listen() has to be called first
     * @uses socket_accept()
     */
    public function accept()
    {
        $resource = @socket_accept($this->resource);
        if ($resource === false) {
            throw Exception::createFromGlobalSocketOperation();
        }
        return new Socket($resource);
    }

    /**
     * binds a name/address/path to this socket
     *
     * has to be called before issuing connect() or listen()
     *
     * @param string $address either of IPv4:port, hostname:port, [IPv6]:port, unix-path
     * @return self $this (chainable)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @uses socket_bind()
     */
    public function bind($address)
    {
        $ret = @socket_bind($this->resource, $this->unformatAddress($address, $port), $port);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this;
    }

    /**
     * close this socket
     *
     * ATTENTION: make sure to NOT re-use this socket instance after closing it!
     * its socket resource remains closed and most further operations will fail!
     *
     * @return self $this (chainable)
     * @throws \Error PHP 8 only: throws \Error when socket is invalid
     * @see self::shutdown() should be called before closing socket
     * @uses socket_close()
     */
    public function close()
    {
        socket_close($this->resource);
        return $this;
    }

    /**
     * initiate a connection to given address
     *
     * @param string $address either of IPv4:port, hostname:port, [IPv6]:port, unix-path
     * @return self $this (chainable)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @uses socket_connect()
     */
    public function connect($address)
    {
        $ret = @socket_connect($this->resource, $this->unformatAddress($address, $port), $port);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this;
    }

    /**
     * Initiates a new connection to given address, wait for up to $timeout seconds
     *
     * The given $timeout parameter is an upper bound, a maximum time to wait
     * for the connection to be either accepted or rejected.
     *
     * The resulting socket resource will be set to non-blocking mode,
     * regardless of its previous state and whether this method succedes or
     * if it fails. Make sure to reset with `setBlocking(true)` if you want to
     * continue using blocking calls.
     *
     * @param string $address either of IPv4:port, hostname:port, [IPv6]:port, unix-path
     * @param float  $timeout maximum time to wait (in seconds)
     * @return self $this (chainable)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @uses self::setBlocking() to enable non-blocking mode
     * @uses self::connect() to initiate the connection
     * @uses self::selectWrite() to wait for the connection to complete
     * @uses self::assertAlive() to check connection state
     */
    public function connectTimeout($address, $timeout)
    {
        $this->setBlocking(false);

        try {
            // socket is non-blocking, so connect should emit EINPROGRESS
            $this->connect($address);

            // socket is already connected immediately?
            return $this;
        } catch (Exception $e) {
            // non-blocking connect() should be EINPROGRESS (or EWOULDBLOCK on Windows) => otherwise re-throw
            if ($e->getCode() !== SOCKET_EINPROGRESS && $e->getCode() !== SOCKET_EWOULDBLOCK) {
                throw $e;
            }

            // connection should be completed (or rejected) within timeout
            if ($this->selectWrite($timeout) === false) {
                throw new Exception('Timed out while waiting for connection', SOCKET_ETIMEDOUT);
            }

            // confirm connection success (or fail if connected has been rejected)
            $this->assertAlive();

            return $this;
        }
    }

    /**
     * get socket option
     *
     * @param int $level
     * @param int $optname
     * @return mixed
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @uses socket_get_option()
     */
    public function getOption($level, $optname)
    {
        $value = @socket_get_option($this->resource, $level, $optname);
        if ($value === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $value;
    }

    /**
     * get remote side's address/path
     *
     * @return string
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket is invalid
     * @uses socket_getpeername()
     */
    public function getPeerName()
    {
        $ret = @socket_getpeername($this->resource, $address, $port);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this->formatAddress($address, $port);
    }

    /**
     * get local side's address/path
     *
     * @return string
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket is invalid
     * @uses socket_getsockname()
     */
    public function getSockName()
    {
        $ret = @socket_getsockname($this->resource, $address, $port);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this->formatAddress($address, $port);
    }

    /**
     * start listen for incoming connections
     *
     * @param int $backlog maximum number of incoming connections to be queued
     * @return self $this (chainable)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::bind() has to be called first to bind name to socket
     * @uses socket_listen()
     */
    public function listen($backlog = 0)
    {
        $ret = @socket_listen($this->resource, $backlog);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this;
    }

    /**
     * read up to $length bytes from connect()ed / accept()ed socket
     *
     * The $type parameter specifies if this should use either binary safe reading
     * (PHP_BINARY_READ, the default) or stop at CR or LF characters (PHP_NORMAL_READ)
     *
     * @param int $length maximum length to read
     * @param int $type   either of PHP_BINARY_READ (the default) or PHP_NORMAL_READ
     * @return string
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::recv() if you need to pass flags
     * @uses socket_read()
     */
    public function read($length, $type = PHP_BINARY_READ)
    {
        $data = @socket_read($this->resource, $length, $type);
        if ($data === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $data;
    }

    /**
     * receive up to $length bytes from connect()ed / accept()ed socket
     *
     * @param int $length maximum length to read
     * @param int $flags
     * @return string
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::read() if you do not need to pass $flags
     * @see self::recvFrom() if your socket is not connect()ed
     * @uses socket_recv()
     */
    public function recv($length, $flags)
    {
        $ret = @socket_recv($this->resource, $buffer, $length, $flags);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $buffer;
    }

    /**
     * receive up to $length bytes from socket
     *
     * @param int    $length maximum length to read
     * @param int    $flags
     * @param string $remote reference will be filled with remote/peer address/path
     * @return string
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::recv() if your socket is connect()ed
     * @uses socket_recvfrom()
     */
    public function recvFrom($length, $flags, &$remote)
    {
        $ret = @socket_recvfrom($this->resource, $buffer, $length, $flags, $address, $port);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        $remote = $this->formatAddress($address, $port);
        return $buffer;
    }

    /**
     * check socket to see if a read/recv/revFrom will not block
     *
     * @param float|null $sec maximum time to wait (in seconds), 0 = immediate polling, null = no limit
     * @return boolean true = socket ready (read will not block), false = timeout expired, socket is not ready
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @uses socket_select()
     */
    public function selectRead($sec = 0)
    {
        $usec = $sec === null ? null : (int) (($sec - floor($sec)) * 1000000);
        $r = array($this->resource);
        $n = null;
        $ret = @socket_select($r, $n, $n, $sec === null ? null : (int) $sec, $usec);
        if ($ret === false) {
            throw Exception::createFromGlobalSocketOperation('Failed to select socket for reading');
        }
        return !!$ret;
    }

    /**
     * check socket to see if a write/send/sendTo will not block
     *
     * @param float|null $sec maximum time to wait (in seconds), 0 = immediate polling, null = no limit
     * @return boolean true = socket ready (write will not block), false = timeout expired, socket is not ready
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @uses socket_select()
     */
    public function selectWrite($sec = 0)
    {
        $usec = $sec === null ? null : (int) (($sec - floor($sec)) * 1000000);
        $w = array($this->resource);
        $n = null;
        $ret = @socket_select($n, $w, $n, $sec === null ? null : (int) $sec, $usec);
        if ($ret === false) {
            throw Exception::createFromGlobalSocketOperation('Failed to select socket for writing');
        }
        return !!$ret;
    }

    /**
     * send given $buffer to connect()ed / accept()ed socket
     *
     * @param string $buffer
     * @param int    $flags
     * @return int number of bytes actually written (make sure to check against given buffer length!)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::write() if you do not need to pass $flags
     * @see self::sendTo() if your socket is not connect()ed
     * @uses socket_send()
     */
    public function send($buffer, $flags)
    {
        $ret = @socket_send($this->resource, $buffer, strlen($buffer), $flags);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $ret;
    }

    /**
     * send given $buffer to socket
     *
     * @param string $buffer
     * @param int    $flags
     * @param string $remote remote/peer address/path
     * @return int number of bytes actually written
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::send() if your socket is connect()ed
     * @uses socket_sendto()
     */
    public function sendTo($buffer, $flags, $remote)
    {
        $ret = @socket_sendto($this->resource, $buffer, strlen($buffer), $flags, $this->unformatAddress($remote, $port), $port);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $ret;
    }

    /**
     * enable/disable blocking/nonblocking mode (O_NONBLOCK flag)
     *
     * @param boolean $toggle
     * @return self $this (chainable)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @uses socket_set_block()
     * @uses socket_set_nonblock()
     */
    public function setBlocking($toggle = true)
    {
        $ret = $toggle ? @socket_set_block($this->resource) : @socket_set_nonblock($this->resource);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this;
    }

    /**
     * set socket option
     *
     * @param int   $level
     * @param int   $optname
     * @param mixed $optval
     * @return self $this (chainable)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::getOption()
     * @uses socket_set_option()
     */
    public function setOption($level, $optname, $optval)
    {
        $ret = @socket_set_option($this->resource, $level, $optname, $optval);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this;
    }

    /**
     * shuts down socket for receiving, sending or both
     *
     * @param int $how 0 = shutdown reading, 1 = shutdown writing, 2 = shutdown reading and writing
     * @return self $this (chainable)
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::close()
     * @uses socket_shutdown()
     */
    public function shutdown($how = 2)
    {
        $ret = @socket_shutdown($this->resource, $how);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $this;
    }

    /**
     * write $buffer to connect()ed / accept()ed socket
     *
     * @param string $buffer
     * @return int number of bytes actually written
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket or arguments are invalid
     * @see self::send() if you need to pass flags
     * @uses socket_write()
     */
    public function write($buffer)
    {
        $ret = @socket_write($this->resource, $buffer);
        if ($ret === false) {
            throw Exception::createFromSocketResource($this->resource);
        }
        return $ret;
    }

    /**
     * get socket type as passed to socket_create()
     *
     * @return int usually either SOCK_STREAM or SOCK_DGRAM
     * @throws Exception on error
     * @throws \Error PHP 8 only: throws \Error when socket is invalid
     * @uses self::getOption()
     */
    public function getType()
    {
        return $this->getOption(SOL_SOCKET, SO_TYPE);
    }

    /**
     * assert that this socket is alive and its error code is 0
     *
     * This will fetch and reset the current socket error code from the
     * socket and options and will throw an Exception along with error
     * message and code if the code is not 0, i.e. if it does indicate
     * an error situation.
     *
     * Calling this method should not be needed in most cases and is
     * likely to not throw an Exception. Each socket operation like
     * connect(), send(), etc. will throw a dedicated Exception in case
     * of an error anyway.
     *
     * @return self $this (chainable)
     * @throws Exception if error code is not 0
     * @throws \Error PHP 8 only: throws \Error when socket is invalid
     * @uses self::getOption() to retrieve and clear current error code
     * @uses self::getErrorMessage() to translate error code to
     */
    public function assertAlive()
    {
        $code = $this->getOption(SOL_SOCKET, SO_ERROR);
        if ($code !== 0) {
            throw Exception::createFromCode($code, 'Socket error');
        }
        return $this;
    }

    /**
     * format given address/host/path and port
     *
     * @param string $address
     * @param int    $port
     * @return string
     */
    protected function formatAddress($address, $port)
    {
        if ($port !== 0) {
            if (strpos($address, ':') !== false) {
                $address = '[' . $address . ']';
            }
            $address .= ':' . $port;
        }
        return $address;
    }

    /**
     * format given address by splitting it into returned address and port set by reference
     *
     * @param string $address
     * @param int $port
     * @return string address with port removed
     */
    protected function unformatAddress($address, &$port)
    {
        // [::1]:2 => ::1 2
        // test:2 => test 2
        // ::1 => ::1
        // test => test

        $colon = strrpos($address, ':');

        // there is a colon and this is the only colon or there's a closing IPv6 bracket right before it
        if ($colon !== false && (strpos($address, ':') === $colon || strpos($address, ']') === ($colon - 1))) {
            $port = (int)substr($address, $colon + 1);
            $address = substr($address, 0, $colon);

            // remove IPv6 square brackets
            if (substr($address, 0, 1) === '[') {
                $address = substr($address, 1, -1);
            }
        }
        return $address;
    }
}
