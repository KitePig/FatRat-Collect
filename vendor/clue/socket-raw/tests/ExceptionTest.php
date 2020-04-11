<?php

use PHPUnit\Framework\TestCase;
use Socket\Raw\Exception;

class ExceptionTest extends TestCase
{
    public function testCreateFromSocketResourceWithClosedResourceThrows()
    {
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_close($socket);

        $exception = Exception::createFromSocketResource($socket);

        $this->assertInstanceOf('Socket\Raw\Exception', $exception);
        $this->assertEquals(SOCKET_ENOTSOCK, $exception->getCode());
    }
}
