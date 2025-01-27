/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermes -O -dump-ir %s | %FileCheckOrRegen %s

function backwards_branch() {
  for (var i = 0; i < 4; i++) {
    switch (i) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        break;
    }
    i = 2;
  }
}

// Auto-generated content below. Please do not modify manually.

// CHECK:function global() : undefined
// CHECK-NEXT:frame = [], globals = [backwards_branch]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CreateFunctionInst %backwards_branch() : undefined
// CHECK-NEXT:  %1 = StorePropertyInst %0 : closure, globalObject : object, "backwards_branch" : string
// CHECK-NEXT:  %2 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function backwards_branch() : undefined
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = BranchInst %BB1
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %1 = PhiInst 0 : number, %BB0, 3 : number, %BB1
// CHECK-NEXT:  %2 = SwitchInst %1 : number, %BB1, 0 : number, %BB1, 1 : number, %BB1, 2 : number, %BB1, 3 : number, %BB1, 4 : number, %BB1, 5 : number, %BB1, 6 : number, %BB1, 7 : number, %BB1, 8 : number, %BB1, 9 : number, %BB1
// CHECK-NEXT:function_end
