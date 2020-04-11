#!/usr/bin/env php
<?php

use Socket\Raw\Factory;

error_reporting(-1);

require_once __DIR__.'/../vendor/autoload.php';

$factory = new Factory();
$socket = $factory->createClient('www.google.com:80');

echo 'Client connected to ' . $socket->getPeerName() . PHP_EOL . PHP_EOL;

$socket->write("GET / HTTP/1.1\r\nHost: www.google.com\r\n\r\n");

var_dump($socket->read(8192));

$socket->close();
