/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermes -hermes-parser -dump-ir %s     -O  | %FileCheckOrRegen %s --match-full-lines --check-prefix=OPT-CHECK
// RUN: %hermes -hermes-parser -dump-ir %s     -O0 | %FileCheckOrRegen %s --match-full-lines

function foo(p1, p2, p3) {
  var t = p1 + p2;
  var z = p2 + p3;
  var k = z + t;
  return ;
}

// Auto-generated content below. Please do not modify manually.

// OPT-CHECK:function global() : undefined
// OPT-CHECK-NEXT:frame = [], globals = [foo]
// OPT-CHECK-NEXT:%BB0:
// OPT-CHECK-NEXT:  %0 = CreateFunctionInst %foo() : undefined
// OPT-CHECK-NEXT:  %1 = StorePropertyInst %0 : closure, globalObject : object, "foo" : string
// OPT-CHECK-NEXT:  %2 = ReturnInst undefined : undefined
// OPT-CHECK-NEXT:function_end

// OPT-CHECK:function foo(p1, p2, p3) : undefined
// OPT-CHECK-NEXT:frame = []
// OPT-CHECK-NEXT:%BB0:
// OPT-CHECK-NEXT:  %0 = BinaryOperatorInst '+', %p1, %p2
// OPT-CHECK-NEXT:  %1 = BinaryOperatorInst '+', %p2, %p3
// OPT-CHECK-NEXT:  %2 = ReturnInst undefined : undefined
// OPT-CHECK-NEXT:function_end

// CHECK:function global()
// CHECK-NEXT:frame = [], globals = [foo]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CreateFunctionInst %foo()
// CHECK-NEXT:  %1 = StorePropertyInst %0 : closure, globalObject : object, "foo" : string
// CHECK-NEXT:  %2 = AllocStackInst $?anon_0_ret
// CHECK-NEXT:  %3 = StoreStackInst undefined : undefined, %2
// CHECK-NEXT:  %4 = LoadStackInst %2
// CHECK-NEXT:  %5 = ReturnInst %4
// CHECK-NEXT:function_end

// CHECK:function foo(p1, p2, p3)
// CHECK-NEXT:frame = [p1, p2, p3, t, z, k]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %p1, [p1]
// CHECK-NEXT:  %1 = StoreFrameInst %p2, [p2]
// CHECK-NEXT:  %2 = StoreFrameInst %p3, [p3]
// CHECK-NEXT:  %3 = StoreFrameInst undefined : undefined, [t]
// CHECK-NEXT:  %4 = StoreFrameInst undefined : undefined, [z]
// CHECK-NEXT:  %5 = StoreFrameInst undefined : undefined, [k]
// CHECK-NEXT:  %6 = LoadFrameInst [p1]
// CHECK-NEXT:  %7 = LoadFrameInst [p2]
// CHECK-NEXT:  %8 = BinaryOperatorInst '+', %6, %7
// CHECK-NEXT:  %9 = StoreFrameInst %8, [t]
// CHECK-NEXT:  %10 = LoadFrameInst [p2]
// CHECK-NEXT:  %11 = LoadFrameInst [p3]
// CHECK-NEXT:  %12 = BinaryOperatorInst '+', %10, %11
// CHECK-NEXT:  %13 = StoreFrameInst %12, [z]
// CHECK-NEXT:  %14 = LoadFrameInst [z]
// CHECK-NEXT:  %15 = LoadFrameInst [t]
// CHECK-NEXT:  %16 = BinaryOperatorInst '+', %14, %15
// CHECK-NEXT:  %17 = StoreFrameInst %16, [k]
// CHECK-NEXT:  %18 = ReturnInst undefined : undefined
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %19 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end
