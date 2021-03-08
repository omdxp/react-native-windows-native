#pragma once

#include <functional>
#include <sstream>
#include <string>

#include "JSValue.h"
#include "NativeModules.h"

namespace winrt::ReactWindowsNative {
	// this is the name of react native module on windows
	REACT_MODULE(AsyncSample);
	struct AsyncSample {
		// this method get a string as a promise
		REACT_METHOD(GetString, L"getString");
		void GetString(bool error, React::ReactPromise<React::JSValue>&& result) noexcept {
			if (error) {
				result.Reject("Failure");
			}
			else {
				std::string text = "Hello, Omar!";
				result.Resolve(React::JSValue{ text });
				result.Resolve(text);
			}
		}
	};
}