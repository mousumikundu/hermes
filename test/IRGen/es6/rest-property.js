/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermesc -O0 -dump-ir %s | %FileCheckOrRegen --match-full-lines %s

function f1(t) {
    var {...a} = t;
    return a;
}

function f2(t) {
    var {a, b, ...rest} = t;
    return rest;
}

function f3(t) {
    var a, rest;
    ({a, ...rest} = t);
}

function f4(o, t) {
    var a;
    ({a, ...o.rest} = t);
}

function f5(o) {
    var a, rest;
    ({a, a,  ...rest} = o);
}

// Auto-generated content below. Please do not modify manually.

// CHECK:function global()
// CHECK-NEXT:frame = [], globals = [f1, f2, f3, f4, f5]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CreateFunctionInst %f1()
// CHECK-NEXT:  %1 = StorePropertyInst %0 : closure, globalObject : object, "f1" : string
// CHECK-NEXT:  %2 = CreateFunctionInst %f2()
// CHECK-NEXT:  %3 = StorePropertyInst %2 : closure, globalObject : object, "f2" : string
// CHECK-NEXT:  %4 = CreateFunctionInst %f3()
// CHECK-NEXT:  %5 = StorePropertyInst %4 : closure, globalObject : object, "f3" : string
// CHECK-NEXT:  %6 = CreateFunctionInst %f4()
// CHECK-NEXT:  %7 = StorePropertyInst %6 : closure, globalObject : object, "f4" : string
// CHECK-NEXT:  %8 = CreateFunctionInst %f5()
// CHECK-NEXT:  %9 = StorePropertyInst %8 : closure, globalObject : object, "f5" : string
// CHECK-NEXT:  %10 = AllocStackInst $?anon_0_ret
// CHECK-NEXT:  %11 = StoreStackInst undefined : undefined, %10
// CHECK-NEXT:  %12 = LoadStackInst %10
// CHECK-NEXT:  %13 = ReturnInst %12
// CHECK-NEXT:function_end

// CHECK:function f1(t)
// CHECK-NEXT:frame = [t, a]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %t, [t]
// CHECK-NEXT:  %1 = StoreFrameInst undefined : undefined, [a]
// CHECK-NEXT:  %2 = LoadFrameInst [t]
// CHECK-NEXT:  %3 = BinaryOperatorInst '==', %2, null : null
// CHECK-NEXT:  %4 = CondBranchInst %3, %BB1, %BB2
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %5 = CallBuiltinInst [HermesBuiltin.throwTypeError] : number, undefined : undefined, %2, "Cannot destructure 'undefined' or 'null'." : string
// CHECK-NEXT:  %6 = ReturnInst undefined : undefined
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %7 = AllocObjectInst 0 : number, empty
// CHECK-NEXT:  %8 = CallBuiltinInst [HermesBuiltin.copyDataProperties] : number, undefined : undefined, %7 : object, %2, undefined : undefined
// CHECK-NEXT:  %9 = StoreFrameInst %8, [a]
// CHECK-NEXT:  %10 = LoadFrameInst [a]
// CHECK-NEXT:  %11 = ReturnInst %10
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %12 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function f2(t)
// CHECK-NEXT:frame = [t, a, b, rest]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %t, [t]
// CHECK-NEXT:  %1 = StoreFrameInst undefined : undefined, [a]
// CHECK-NEXT:  %2 = StoreFrameInst undefined : undefined, [b]
// CHECK-NEXT:  %3 = StoreFrameInst undefined : undefined, [rest]
// CHECK-NEXT:  %4 = LoadFrameInst [t]
// CHECK-NEXT:  %5 = LoadPropertyInst %4, "a" : string
// CHECK-NEXT:  %6 = StoreFrameInst %5, [a]
// CHECK-NEXT:  %7 = LoadPropertyInst %4, "b" : string
// CHECK-NEXT:  %8 = StoreFrameInst %7, [b]
// CHECK-NEXT:  %9 = AllocObjectLiteralInst "a" : string, 0 : number, "b" : string, 0 : number
// CHECK-NEXT:  %10 = AllocObjectInst 0 : number, empty
// CHECK-NEXT:  %11 = CallBuiltinInst [HermesBuiltin.copyDataProperties] : number, undefined : undefined, %10 : object, %4, %9 : object
// CHECK-NEXT:  %12 = StoreFrameInst %11, [rest]
// CHECK-NEXT:  %13 = LoadFrameInst [rest]
// CHECK-NEXT:  %14 = ReturnInst %13
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %15 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function f3(t)
// CHECK-NEXT:frame = [t, a, rest]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %t, [t]
// CHECK-NEXT:  %1 = StoreFrameInst undefined : undefined, [a]
// CHECK-NEXT:  %2 = StoreFrameInst undefined : undefined, [rest]
// CHECK-NEXT:  %3 = LoadFrameInst [t]
// CHECK-NEXT:  %4 = LoadPropertyInst %3, "a" : string
// CHECK-NEXT:  %5 = StoreFrameInst %4, [a]
// CHECK-NEXT:  %6 = AllocObjectLiteralInst "a" : string, 0 : number
// CHECK-NEXT:  %7 = AllocObjectInst 0 : number, empty
// CHECK-NEXT:  %8 = CallBuiltinInst [HermesBuiltin.copyDataProperties] : number, undefined : undefined, %7 : object, %3, %6 : object
// CHECK-NEXT:  %9 = StoreFrameInst %8, [rest]
// CHECK-NEXT:  %10 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function f4(o, t)
// CHECK-NEXT:frame = [o, t, a]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %o, [o]
// CHECK-NEXT:  %1 = StoreFrameInst %t, [t]
// CHECK-NEXT:  %2 = StoreFrameInst undefined : undefined, [a]
// CHECK-NEXT:  %3 = LoadFrameInst [t]
// CHECK-NEXT:  %4 = LoadPropertyInst %3, "a" : string
// CHECK-NEXT:  %5 = StoreFrameInst %4, [a]
// CHECK-NEXT:  %6 = LoadFrameInst [o]
// CHECK-NEXT:  %7 = AllocObjectLiteralInst "a" : string, 0 : number
// CHECK-NEXT:  %8 = AllocObjectInst 0 : number, empty
// CHECK-NEXT:  %9 = CallBuiltinInst [HermesBuiltin.copyDataProperties] : number, undefined : undefined, %8 : object, %3, %7 : object
// CHECK-NEXT:  %10 = StorePropertyInst %9, %6, "rest" : string
// CHECK-NEXT:  %11 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function f5(o)
// CHECK-NEXT:frame = [o, a, rest]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %o, [o]
// CHECK-NEXT:  %1 = StoreFrameInst undefined : undefined, [a]
// CHECK-NEXT:  %2 = StoreFrameInst undefined : undefined, [rest]
// CHECK-NEXT:  %3 = LoadFrameInst [o]
// CHECK-NEXT:  %4 = LoadPropertyInst %3, "a" : string
// CHECK-NEXT:  %5 = StoreFrameInst %4, [a]
// CHECK-NEXT:  %6 = LoadPropertyInst %3, "a" : string
// CHECK-NEXT:  %7 = StoreFrameInst %6, [a]
// CHECK-NEXT:  %8 = AllocObjectLiteralInst "a" : string, 0 : number
// CHECK-NEXT:  %9 = AllocObjectInst 0 : number, empty
// CHECK-NEXT:  %10 = CallBuiltinInst [HermesBuiltin.copyDataProperties] : number, undefined : undefined, %9 : object, %3, %8 : object
// CHECK-NEXT:  %11 = StoreFrameInst %10, [rest]
// CHECK-NEXT:  %12 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end
