/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermes -hermes-parser -dump-ir %s     -O | %FileCheckOrRegen %s

function simple(x, y) {
  var t = 9;
  if (x) { t = 19; }
  return t;
}

function control_flow(x, y) {
  var t = 9;

  if (x) {
    t = 19;
  } else {
    t = 12;
    if (y) {
      t = 15;
    } else {
      t = 4;
    }
  }
  t = t + 1;
  if (x - 1) {
    t = y;
  } else {
    if (y) { t = 15; }
  }

  return t;
}

function control_catch(x, y) {
  var t = 9;

  if (x) {
    try {
      if (j) {
        throw 3;
      }
      t = 19;
    } catch (e) {
      return t;
    }
  }

  return t;
}

function multi(x, y) {
  var t0 = 9;
  var t1 = 9;
  if (x) { t0 = 19; t1 = t0; }
  return t0 + t1;
}

// Make sure that we are not promoting allocas inside try-catch sections.
function badThrow() {
  var result = -1;
  try {
      result = 100;
      throw "hello";
  } catch (e) {}
  return result;
}

// Auto-generated content below. Please do not modify manually.

// CHECK:function global() : undefined
// CHECK-NEXT:frame = [], globals = [simple, control_flow, control_catch, multi, badThrow]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CreateFunctionInst %simple() : number
// CHECK-NEXT:  %1 = StorePropertyInst %0 : closure, globalObject : object, "simple" : string
// CHECK-NEXT:  %2 = CreateFunctionInst %control_flow()
// CHECK-NEXT:  %3 = StorePropertyInst %2 : closure, globalObject : object, "control_flow" : string
// CHECK-NEXT:  %4 = CreateFunctionInst %control_catch() : number
// CHECK-NEXT:  %5 = StorePropertyInst %4 : closure, globalObject : object, "control_catch" : string
// CHECK-NEXT:  %6 = CreateFunctionInst %multi() : number
// CHECK-NEXT:  %7 = StorePropertyInst %6 : closure, globalObject : object, "multi" : string
// CHECK-NEXT:  %8 = CreateFunctionInst %badThrow() : number
// CHECK-NEXT:  %9 = StorePropertyInst %8 : closure, globalObject : object, "badThrow" : string
// CHECK-NEXT:  %10 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function simple(x, y) : number
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CondBranchInst %x, %BB1, %BB2
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %1 = BranchInst %BB2
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %2 = PhiInst 19 : number, %BB1, 9 : number, %BB0
// CHECK-NEXT:  %3 = ReturnInst %2 : number
// CHECK-NEXT:function_end

// CHECK:function control_flow(x, y)
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CondBranchInst %x, %BB1, %BB2
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %1 = CondBranchInst %y, %BB1, %BB3
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %2 = PhiInst 4 : number, %BB3, 19 : number, %BB0, 15 : number, %BB2
// CHECK-NEXT:  %3 = BinaryOperatorInst '+', %2 : number, 1 : number
// CHECK-NEXT:  %4 = BinaryOperatorInst '-', %x, 1 : number
// CHECK-NEXT:  %5 = CondBranchInst %4 : number, %BB4, %BB5
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %6 = BranchInst %BB1
// CHECK-NEXT:%BB5:
// CHECK-NEXT:  %7 = CondBranchInst %y, %BB6, %BB4
// CHECK-NEXT:%BB4:
// CHECK-NEXT:  %8 = PhiInst 15 : number, %BB6, %3 : number, %BB5, %y, %BB1
// CHECK-NEXT:  %9 = ReturnInst %8
// CHECK-NEXT:%BB6:
// CHECK-NEXT:  %10 = BranchInst %BB4
// CHECK-NEXT:function_end

// CHECK:function control_catch(x, y) : number
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = AllocStackInst $t
// CHECK-NEXT:  %1 = StoreStackInst 9 : number, %0 : number
// CHECK-NEXT:  %2 = CondBranchInst %x, %BB1, %BB2
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %3 = TryStartInst %BB3, %BB4
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %4 = LoadStackInst %0 : number
// CHECK-NEXT:  %5 = ReturnInst %4 : number
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %6 = CatchInst
// CHECK-NEXT:  %7 = LoadStackInst %0 : number
// CHECK-NEXT:  %8 = ReturnInst %7 : number
// CHECK-NEXT:%BB4:
// CHECK-NEXT:  %9 = TryLoadGlobalPropertyInst globalObject : object, "j" : string
// CHECK-NEXT:  %10 = CondBranchInst %9, %BB5, %BB6
// CHECK-NEXT:%BB5:
// CHECK-NEXT:  %11 = ThrowInst 3 : number
// CHECK-NEXT:%BB6:
// CHECK-NEXT:  %12 = StoreStackInst 19 : number, %0 : number
// CHECK-NEXT:  %13 = BranchInst %BB7
// CHECK-NEXT:%BB7:
// CHECK-NEXT:  %14 = TryEndInst
// CHECK-NEXT:  %15 = BranchInst %BB2
// CHECK-NEXT:function_end

// CHECK:function multi(x, y) : number
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CondBranchInst %x, %BB1, %BB2
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %1 = BranchInst %BB2
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %2 = PhiInst 19 : number, %BB1, 9 : number, %BB0
// CHECK-NEXT:  %3 = PhiInst 19 : number, %BB1, 9 : number, %BB0
// CHECK-NEXT:  %4 = BinaryOperatorInst '+', %2 : number, %3 : number
// CHECK-NEXT:  %5 = ReturnInst %4 : number
// CHECK-NEXT:function_end

// CHECK:function badThrow() : number
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = AllocStackInst $result
// CHECK-NEXT:  %1 = StoreStackInst -1 : number, %0 : number
// CHECK-NEXT:  %2 = TryStartInst %BB1, %BB2
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %3 = CatchInst
// CHECK-NEXT:  %4 = LoadStackInst %0 : number
// CHECK-NEXT:  %5 = ReturnInst %4 : number
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %6 = StoreStackInst 100 : number, %0 : number
// CHECK-NEXT:  %7 = ThrowInst "hello" : string
// CHECK-NEXT:function_end
