# Tillo SDK exists test

import pytest
from tillo_sdk import TilloSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TilloSDK.test(None, None)
        assert testsdk is not None
