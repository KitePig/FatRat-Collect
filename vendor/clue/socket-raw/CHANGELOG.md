# Changelog

## 1.5.0 (2020-11-27)

*   Feature: Support PHP 8 and drop legacy HHVM support.
    (#60 and #61 by @clue)
    
*   Improve test suite and add `.gitattributes` to exclude dev files from export.
    Update to PHPUnit 9 and simplify test matrix.
    (#50, #51, #58 and #63 by @clue and #57 by @SimonFrings)

## 1.4.1 (2019-10-28)

*   Fix: Fix error reporting when invoking methods on closed socket instance.
    (#48 by @clue)

*   Improve test suite to run tests on Windows via Travis CI.
    (#49 by @clue)

## 1.4.0 (2019-01-22)

*   Feature: Improve Windows support (async connections and Unix domain sockets).
    (#43 by @clue)

*   Improve test suite by adding forward compatibility with PHPUnit 7 and PHPUnit 6.
    (#42 by @clue)

## 1.3.0 (2018-06-10)

*   Feature: Add `$timeout` parameter for `Factory::createClient()`
    (#39 by @Elbandi and @clue)

    ```php
    // connect to Google, but wait no longer than 2.5s for connection
    $socket = $factory->createClient('www.google.com:80', 2.5);
    ```

*   Improve test suite by adding PHPUnit to require-dev,
    update test suite to test against legacy PHP 5.3 through PHP 7.2 and
    optionally skip functional integration tests requiring internet.
    (#26 by @ascii-soup, #28, #29, #37 and #38 by @clue)

## 1.2.0 (2015-03-18)

* Feature: Expose optional `$type` parameter for `Socket::read()`
  ([#16](https://github.com/clue/php-socket-raw/pull/16) by @Elbandi)

## 1.1.0 (2014-10-24)

* Feature: Accept float timeouts like `0.5` for `Socket::selectRead()` and `Socket::selectWrite()`.
  ([#8](https://github.com/clue/php-socket-raw/issues/8))

* Feature: Add new `Socket::connectTimeout()` method.
  ([#11](https://github.com/clue/php-socket-raw/pull/11))

* Fix: Close invalid socket resource when `Factory` fails to create a `Socket`.
  ([#12](https://github.com/clue/php-socket-raw/pull/12))

* Fix: Calling `accept()` on an idle server socket emits right error code and message.
  ([#14](https://github.com/clue/php-socket-raw/pull/14))

## 1.0.0 (2014-05-10)

* Feature: Improved errors reporting through dedicated `Exception`
  ([#6](https://github.com/clue/socket-raw/pull/6))
* Feature: Support HHVM
  ([#5](https://github.com/clue/socket-raw/pull/5))
* Use PSR-4 layout
  ([#3](https://github.com/clue/socket-raw/pull/3))
* Continuous integration via Travis CI

## 0.1.2 (2013-05-09)

* Fix: The `Factory::createUdg()` now returns the right socket type.
* Fix: Fix ICMPv6 addressing to not require square brackets because it does not
  use ports.
* Extended test suite.

## 0.1.1 (2013-04-18)

* Fix: Raw sockets now correctly report no port instead of a `0` port.

## 0.1.0 (2013-04-10)

* First tagged release
