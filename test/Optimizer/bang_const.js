/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermes -hermes-parser -dump-ir %s     -O | %FileCheckOrRegen %s

print(!0);

print(!-0);

print(!0.0);

print(!NaN);

print(!1);

print(!null);

print(!undefined);

print(!"");

print(!"abc");

print(!print);

print(!true);

print(!false);

// Auto-generated content below. Please do not modify manually.

// CHECK:function global()
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %1 = CallInst %0, undefined : undefined, true : boolean
// CHECK-NEXT:  %2 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %3 = CallInst %2, undefined : undefined, true : boolean
// CHECK-NEXT:  %4 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %5 = CallInst %4, undefined : undefined, true : boolean
// CHECK-NEXT:  %6 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %7 = TryLoadGlobalPropertyInst globalObject : object, "NaN" : string
// CHECK-NEXT:  %8 = UnaryOperatorInst '!', %7
// CHECK-NEXT:  %9 = CallInst %6, undefined : undefined, %8 : boolean
// CHECK-NEXT:  %10 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %11 = CallInst %10, undefined : undefined, false : boolean
// CHECK-NEXT:  %12 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %13 = CallInst %12, undefined : undefined, true : boolean
// CHECK-NEXT:  %14 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %15 = CallInst %14, undefined : undefined, true : boolean
// CHECK-NEXT:  %16 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %17 = CallInst %16, undefined : undefined, true : boolean
// CHECK-NEXT:  %18 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %19 = CallInst %18, undefined : undefined, false : boolean
// CHECK-NEXT:  %20 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %21 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %22 = UnaryOperatorInst '!', %21
// CHECK-NEXT:  %23 = CallInst %20, undefined : undefined, %22 : boolean
// CHECK-NEXT:  %24 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %25 = CallInst %24, undefined : undefined, false : boolean
// CHECK-NEXT:  %26 = TryLoadGlobalPropertyInst globalObject : object, "print" : string
// CHECK-NEXT:  %27 = CallInst %26, undefined : undefined, true : boolean
// CHECK-NEXT:  %28 = ReturnInst %27
// CHECK-NEXT:function_end
