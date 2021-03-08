#pragma once

#include "pch.h"

#include <functional>
#define _USE_MATH_DEFINES
#include <math.h>

#include "NativeModules.h"

namespace winrt::ReactWindowsNative {
	// this is the name of react native module on windows
	REACT_MODULE(FancyMath);
	struct FancyMath {
		// define constant E
		REACT_CONSTANT(E);
		const double E = M_E;

		// define constant PI and rename it to Pi
		REACT_CONSTANT(PI, L"Pi");
		const double PI = M_PI;

		// define add method
		REACT_METHOD(Add, L"add");
		double Add(double a, double b) noexcept {
			double result = a + b;
			AddEvent(result);
			return result;
		}

		// define a react event
		REACT_EVENT(AddEvent);
		std::function<void(double)> AddEvent;
	};
}