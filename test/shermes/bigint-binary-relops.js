/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %shermes -exec %s | %FileCheck --match-full-lines %s

print('BigInt Binary <|<=|=>|>');
// CHECK-LABEL: BigInt Binary <|<=|=>|>

function valueAndType(x) {
    if (typeof(x) === "number") {
        if (isNaN(x)) {
            return "nan";
        } else if (x === Infinity) {
            return "+inf";
        } else if (x === -Infinity) {
            return "-inf"
        }
    }

    if (typeof(x) == "boolean" || x === undefined || x === null) {
        return "" + x;
    }

    return typeof(x) + " " + x;
}

function printComparisonsAndResult(label, lhs, rhs) {
    print(label);

    print(valueAndType(lhs), "< ", valueAndType(rhs), " ==> ", lhs <  rhs);
    print(valueAndType(lhs), "<=", valueAndType(rhs), " ==> ", lhs <= rhs);
    print(valueAndType(lhs), "> ", valueAndType(rhs), " ==> ", lhs > rhs);
    print(valueAndType(lhs), ">=", valueAndType(rhs), " ==> ", lhs >= rhs);
    print(valueAndType(rhs), "< ", valueAndType(lhs), " ==> ", rhs < lhs);
    print(valueAndType(rhs), "<=", valueAndType(lhs), " ==> ", rhs <= lhs);
    print(valueAndType(rhs), "> ", valueAndType(lhs), " ==> ", rhs > lhs);
    print(valueAndType(rhs), ">=", valueAndType(lhs), " ==> ", rhs >= lhs);
}

var zero = BigInt(0);
var one = BigInt(1);
var negOne = BigInt(-1);
var huge = BigInt("0x80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
// TODO: use unary minus for negHuge when available.
var negHuge = BigInt("-23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808");
var inf = Infinity;

//////////////////////////////////////
//
// BigInt vs BigInt comparison.
//
//////////////////////////////////////
printComparisonsAndResult("0n vs 0n", zero, zero);
// CHECK-LABEL: 0n vs 0n
// CHECK-NEXT: bigint 0 <  bigint 0 ==> false
// CHECK-NEXT: bigint 0 <= bigint 0 ==> true
// CHECK-NEXT: bigint 0 >  bigint 0 ==> false
// CHECK-NEXT: bigint 0 >= bigint 0 ==> true
// CHECK-NEXT: bigint 0 <  bigint 0 ==> false
// CHECK-NEXT: bigint 0 <= bigint 0 ==> true
// CHECK-NEXT: bigint 0 >  bigint 0 ==> false
// CHECK-NEXT: bigint 0 >= bigint 0 ==> true

printComparisonsAndResult("1n vs 1n", one, one);
// CHECK-LABEL: 1n vs 1n
// CHECK-NEXT: bigint 1 <  bigint 1 ==> false
// CHECK-NEXT: bigint 1 <= bigint 1 ==> true
// CHECK-NEXT: bigint 1 >  bigint 1 ==> false
// CHECK-NEXT: bigint 1 >= bigint 1 ==> true
// CHECK-NEXT: bigint 1 <  bigint 1 ==> false
// CHECK-NEXT: bigint 1 <= bigint 1 ==> true
// CHECK-NEXT: bigint 1 >  bigint 1 ==> false
// CHECK-NEXT: bigint 1 >= bigint 1 ==> true

printComparisonsAndResult("-huge vs -huge", negHuge, negHuge);
// CHECK-LABEL: -huge vs -huge
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true

//////////////////////////////////////
//
// BigInt vs Number comparison.
//
//////////////////////////////////////
printComparisonsAndResult("0n vs 0", zero, 0);
// CHECK-LABEL: 0n vs 0
// CHECK-NEXT: bigint 0 <  number 0 ==> false
// CHECK-NEXT: bigint 0 <= number 0 ==> true
// CHECK-NEXT: bigint 0 >  number 0 ==> false
// CHECK-NEXT: bigint 0 >= number 0 ==> true
// CHECK-NEXT: number 0 <  bigint 0 ==> false
// CHECK-NEXT: number 0 <= bigint 0 ==> true
// CHECK-NEXT: number 0 >  bigint 0 ==> false
// CHECK-NEXT: number 0 >= bigint 0 ==> true

printComparisonsAndResult("0n vs -0", zero, -0.0);
// CHECK-LABEL: 0n vs -0
// CHECK-NEXT: bigint 0 <  number 0 ==> false
// CHECK-NEXT: bigint 0 <= number 0 ==> true
// CHECK-NEXT: bigint 0 >  number 0 ==> false
// CHECK-NEXT: bigint 0 >= number 0 ==> true
// CHECK-NEXT: number 0 <  bigint 0 ==> false
// CHECK-NEXT: number 0 <= bigint 0 ==> true
// CHECK-NEXT: number 0 >  bigint 0 ==> false
// CHECK-NEXT: number 0 >= bigint 0 ==> true

printComparisonsAndResult("1n vs 0.999999", one, 0.999999);
// CHECK-LABEL: 1n vs 0.999999
// CHECK-NEXT: bigint 1 <  number 0.999999 ==> false
// CHECK-NEXT: bigint 1 <= number 0.999999 ==> false
// CHECK-NEXT: bigint 1 >  number 0.999999 ==> true
// CHECK-NEXT: bigint 1 >= number 0.999999 ==> true
// CHECK-NEXT: number 0.999999 <  bigint 1 ==> true
// CHECK-NEXT: number 0.999999 <= bigint 1 ==> true
// CHECK-NEXT: number 0.999999 >  bigint 1 ==> false
// CHECK-NEXT: number 0.999999 >= bigint 1 ==> false

printComparisonsAndResult("1n vs 1.000001", one, 1.000001);
// CHECK-LABEL: 1n vs 1.000001
// CHECK-NEXT: bigint 1 <  number 1.000001 ==> true
// CHECK-NEXT: bigint 1 <= number 1.000001 ==> true
// CHECK-NEXT: bigint 1 >  number 1.000001 ==> false
// CHECK-NEXT: bigint 1 >= number 1.000001 ==> false
// CHECK-NEXT: number 1.000001 <  bigint 1 ==> false
// CHECK-NEXT: number 1.000001 <= bigint 1 ==> false
// CHECK-NEXT: number 1.000001 >  bigint 1 ==> true
// CHECK-NEXT: number 1.000001 >= bigint 1 ==> true

printComparisonsAndResult("-1n vs -0.999999", negOne, -0.999999);
// CHECK-LABEL: -1n vs -0.999999
// CHECK-NEXT: bigint -1 <  number -0.999999 ==> true
// CHECK-NEXT: bigint -1 <= number -0.999999 ==> true
// CHECK-NEXT: bigint -1 >  number -0.999999 ==> false
// CHECK-NEXT: bigint -1 >= number -0.999999 ==> false
// CHECK-NEXT: number -0.999999 <  bigint -1 ==> false
// CHECK-NEXT: number -0.999999 <= bigint -1 ==> false
// CHECK-NEXT: number -0.999999 >  bigint -1 ==> true
// CHECK-NEXT: number -0.999999 >= bigint -1 ==> true

printComparisonsAndResult("-1n vs -1.000001", negOne, -1.000001);
// CHECK-LABEL: -1n vs -1.000001
// CHECK-NEXT: bigint -1 <  number -1.000001 ==> false
// CHECK-NEXT: bigint -1 <= number -1.000001 ==> false
// CHECK-NEXT: bigint -1 >  number -1.000001 ==> true
// CHECK-NEXT: bigint -1 >= number -1.000001 ==> true
// CHECK-NEXT: number -1.000001 <  bigint -1 ==> true
// CHECK-NEXT: number -1.000001 <= bigint -1 ==> true
// CHECK-NEXT: number -1.000001 >  bigint -1 ==> false
// CHECK-NEXT: number -1.000001 >= bigint -1 ==> false

printComparisonsAndResult("1n vs 50", one, 50);
// CHECK-LABEL: 1n vs 50
// CHECK-NEXT: bigint 1 <  number 50 ==> true
// CHECK-NEXT: bigint 1 <= number 50 ==> true
// CHECK-NEXT: bigint 1 >  number 50 ==> false
// CHECK-NEXT: bigint 1 >= number 50 ==> false
// CHECK-NEXT: number 50 <  bigint 1 ==> false
// CHECK-NEXT: number 50 <= bigint 1 ==> false
// CHECK-NEXT: number 50 >  bigint 1 ==> true
// CHECK-NEXT: number 50 >= bigint 1 ==> true

printComparisonsAndResult("-1n vs 50", negOne, 50);
// CHECK-LABEL: -1n vs 50
// CHECK-NEXT: bigint -1 <  number 50 ==> true
// CHECK-NEXT: bigint -1 <= number 50 ==> true
// CHECK-NEXT: bigint -1 >  number 50 ==> false
// CHECK-NEXT: bigint -1 >= number 50 ==> false
// CHECK-NEXT: number 50 <  bigint -1 ==> false
// CHECK-NEXT: number 50 <= bigint -1 ==> false
// CHECK-NEXT: number 50 >  bigint -1 ==> true
// CHECK-NEXT: number 50 >= bigint -1 ==> true

printComparisonsAndResult("1n vs -50", one, -50);
// CHECK-LABEL: 1n vs -50
// CHECK-NEXT: bigint 1 <  number -50 ==> false
// CHECK-NEXT: bigint 1 <= number -50 ==> false
// CHECK-NEXT: bigint 1 >  number -50 ==> true
// CHECK-NEXT: bigint 1 >= number -50 ==> true
// CHECK-NEXT: number -50 <  bigint 1 ==> true
// CHECK-NEXT: number -50 <= bigint 1 ==> true
// CHECK-NEXT: number -50 >  bigint 1 ==> false
// CHECK-NEXT: number -50 >= bigint 1 ==> false

printComparisonsAndResult("huge vs MAX_SAFE_INTEGER", huge, Number.MAX_SAFE_INTEGER);
// CHECK-LABEL: huge vs MAX_SAFE_INTEGER
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  number 9007199254740991 ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= number 9007199254740991 ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  number 9007199254740991 ==> true
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= number 9007199254740991 ==> true
// CHECK-NEXT: number 9007199254740991 <  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: number 9007199254740991 <= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: number 9007199254740991 >  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: number 9007199254740991 >= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false

printComparisonsAndResult("-huge vs MIN_SAFE_INTEGER", negHuge, Number.MIN_SAFE_INTEGER);
// CHECK-LABEL: -huge vs MIN_SAFE_INTEGER
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  number -9007199254740991 ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= number -9007199254740991 ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  number -9007199254740991 ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= number -9007199254740991 ==> false
// CHECK-NEXT: number -9007199254740991 <  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: number -9007199254740991 <= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: number -9007199254740991 >  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: number -9007199254740991 >= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true

//////////////////////////////////////
//
// BigInt vs Inf comparison.
//
//////////////////////////////////////
printComparisonsAndResult("0n vs +inf", zero, inf);
// CHECK-LABEL: 0n vs +inf
// CHECK-NEXT: bigint 0 <  +inf ==> true
// CHECK-NEXT: bigint 0 <= +inf ==> true
// CHECK-NEXT: bigint 0 >  +inf ==> false
// CHECK-NEXT: bigint 0 >= +inf ==> false
// CHECK-NEXT: +inf <  bigint 0 ==> false
// CHECK-NEXT: +inf <= bigint 0 ==> false
// CHECK-NEXT: +inf >  bigint 0 ==> true
// CHECK-NEXT: +inf >= bigint 0 ==> true

printComparisonsAndResult("0n vs -inf", zero, -inf);
// CHECK-LABEL: 0n vs -inf
// CHECK-NEXT: bigint 0 <  -inf ==> false
// CHECK-NEXT: bigint 0 <= -inf ==> false
// CHECK-NEXT: bigint 0 >  -inf ==> true
// CHECK-NEXT: bigint 0 >= -inf ==> true
// CHECK-NEXT: -inf <  bigint 0 ==> true
// CHECK-NEXT: -inf <= bigint 0 ==> true
// CHECK-NEXT: -inf >  bigint 0 ==> false
// CHECK-NEXT: -inf >= bigint 0 ==> false

printComparisonsAndResult("1n vs +inf", one, inf);
// CHECK-LABEL: 1n vs +inf
// CHECK-NEXT: bigint 1 <  +inf ==> true
// CHECK-NEXT: bigint 1 <= +inf ==> true
// CHECK-NEXT: bigint 1 >  +inf ==> false
// CHECK-NEXT: bigint 1 >= +inf ==> false
// CHECK-NEXT: +inf <  bigint 1 ==> false
// CHECK-NEXT: +inf <= bigint 1 ==> false
// CHECK-NEXT: +inf >  bigint 1 ==> true
// CHECK-NEXT: +inf >= bigint 1 ==> true

printComparisonsAndResult("1n vs -inf", one, -inf);
// CHECK-LABEL: 1n vs -inf
// CHECK-NEXT: bigint 1 <  -inf ==> false
// CHECK-NEXT: bigint 1 <= -inf ==> false
// CHECK-NEXT: bigint 1 >  -inf ==> true
// CHECK-NEXT: bigint 1 >= -inf ==> true
// CHECK-NEXT: -inf <  bigint 1 ==> true
// CHECK-NEXT: -inf <= bigint 1 ==> true
// CHECK-NEXT: -inf >  bigint 1 ==> false
// CHECK-NEXT: -inf >= bigint 1 ==> false

printComparisonsAndResult("-1n vs +inf", negOne, inf);
// CHECK-LABEL: -1n vs +inf
// CHECK-NEXT: bigint -1 <  +inf ==> true
// CHECK-NEXT: bigint -1 <= +inf ==> true
// CHECK-NEXT: bigint -1 >  +inf ==> false
// CHECK-NEXT: bigint -1 >= +inf ==> false
// CHECK-NEXT: +inf <  bigint -1 ==> false
// CHECK-NEXT: +inf <= bigint -1 ==> false
// CHECK-NEXT: +inf >  bigint -1 ==> true
// CHECK-NEXT: +inf >= bigint -1 ==> true

printComparisonsAndResult("-1n vs -inf", negOne, -inf);
// CHECK-LABEL: -1n vs -inf
// CHECK-NEXT: bigint -1 <  -inf ==> false
// CHECK-NEXT: bigint -1 <= -inf ==> false
// CHECK-NEXT: bigint -1 >  -inf ==> true
// CHECK-NEXT: bigint -1 >= -inf ==> true
// CHECK-NEXT: -inf <  bigint -1 ==> true
// CHECK-NEXT: -inf <= bigint -1 ==> true
// CHECK-NEXT: -inf >  bigint -1 ==> false
// CHECK-NEXT: -inf >= bigint -1 ==> false

printComparisonsAndResult("huge vs +inf", huge, inf);
// CHECK-LABEL: huge vs +inf
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  +inf ==> true
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= +inf ==> true
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  +inf ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= +inf ==> false
// CHECK-NEXT: +inf <  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: +inf <= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: +inf >  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: +inf >= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true

printComparisonsAndResult("huge vs -inf", huge, -inf);
// CHECK-LABEL: huge vs -inf
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  -inf ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= -inf ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  -inf ==> true
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= -inf ==> true
// CHECK-NEXT: -inf <  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: -inf <= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: -inf >  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: -inf >= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false

printComparisonsAndResult("-huge vs +inf", negHuge, inf);
// CHECK-LABEL: -huge vs +inf
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  +inf ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= +inf ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  +inf ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= +inf ==> false
// CHECK-NEXT: +inf <  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: +inf <= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: +inf >  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: +inf >= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true

printComparisonsAndResult("-huge vs -inf", negHuge, -inf);
// CHECK-LABEL: -huge vs -inf
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  -inf ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= -inf ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  -inf ==> true
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= -inf ==> true
// CHECK-NEXT: -inf <  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: -inf <= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> true
// CHECK-NEXT: -inf >  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: -inf >= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false


//////////////////////////////////////
//
// BigInt vs NaN comparison.
//
//////////////////////////////////////
printComparisonsAndResult("0n vs nan", zero, NaN);
// CHECK-LABEL: 0n vs nan
// CHECK-NEXT: bigint 0 <  nan ==> false
// CHECK-NEXT: bigint 0 <= nan ==> false
// CHECK-NEXT: bigint 0 >  nan ==> false
// CHECK-NEXT: bigint 0 >= nan ==> false
// CHECK-NEXT: nan <  bigint 0 ==> false
// CHECK-NEXT: nan <= bigint 0 ==> false
// CHECK-NEXT: nan >  bigint 0 ==> false
// CHECK-NEXT: nan >= bigint 0 ==> false

printComparisonsAndResult("1n vs nan", one, NaN);
// CHECK-LABEL: 1n vs nan
// CHECK-NEXT: bigint 1 <  nan ==> false
// CHECK-NEXT: bigint 1 <= nan ==> false
// CHECK-NEXT: bigint 1 >  nan ==> false
// CHECK-NEXT: bigint 1 >= nan ==> false
// CHECK-NEXT: nan <  bigint 1 ==> false
// CHECK-NEXT: nan <= bigint 1 ==> false
// CHECK-NEXT: nan >  bigint 1 ==> false
// CHECK-NEXT: nan >= bigint 1 ==> false

printComparisonsAndResult("-1n vs nan", negOne, NaN);
// CHECK-LABEL: -1n vs nan
// CHECK-NEXT: bigint -1 <  nan ==> false
// CHECK-NEXT: bigint -1 <= nan ==> false
// CHECK-NEXT: bigint -1 >  nan ==> false
// CHECK-NEXT: bigint -1 >= nan ==> false
// CHECK-NEXT: nan <  bigint -1 ==> false
// CHECK-NEXT: nan <= bigint -1 ==> false
// CHECK-NEXT: nan >  bigint -1 ==> false
// CHECK-NEXT: nan >= bigint -1 ==> false

printComparisonsAndResult("huge vs nan", huge, NaN);
// CHECK-LABEL: huge vs nan
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  nan ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= nan ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  nan ==> false
// CHECK-NEXT: bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= nan ==> false
// CHECK-NEXT: nan <  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: nan <= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: nan >  bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: nan >= bigint 23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false

printComparisonsAndResult("-huge vs nan", negHuge, NaN);
// CHECK-LABEL: -huge vs nan
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <  nan ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 <= nan ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >  nan ==> false
// CHECK-NEXT: bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 >= nan ==> false
// CHECK-NEXT: nan <  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: nan <= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: nan >  bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false
// CHECK-NEXT: nan >= bigint -23817051317718446589520242536874132581700120107002038199303870846751188192899823151552628349788604516295066307994130118526061826166445047808 ==> false

//////////////////////////////////////
//
// BigInt vs Boolean comparison.
//
//////////////////////////////////////
printComparisonsAndResult("0n vs true", zero, true);
// CHECK-LABEL: 0n vs true
// CHECK-NEXT: bigint 0 <  true ==> true
// CHECK-NEXT: bigint 0 <= true ==> true
// CHECK-NEXT: bigint 0 >  true ==> false
// CHECK-NEXT: bigint 0 >= true ==> false
// CHECK-NEXT: true <  bigint 0 ==> false
// CHECK-NEXT: true <= bigint 0 ==> false
// CHECK-NEXT: true >  bigint 0 ==> true
// CHECK-NEXT: true >= bigint 0 ==> true

printComparisonsAndResult("1n vs true", one, true);
// CHECK-LABEL: 1n vs true
// CHECK-NEXT: bigint 1 <  true ==> false
// CHECK-NEXT: bigint 1 <= true ==> true
// CHECK-NEXT: bigint 1 >  true ==> false
// CHECK-NEXT: bigint 1 >= true ==> true
// CHECK-NEXT: true <  bigint 1 ==> false
// CHECK-NEXT: true <= bigint 1 ==> true
// CHECK-NEXT: true >  bigint 1 ==> false
// CHECK-NEXT: true >= bigint 1 ==> true

printComparisonsAndResult("-1n vs true", negOne, true);
// CHECK-LABEL: -1n vs true
// CHECK-NEXT: bigint -1 <  true ==> true
// CHECK-NEXT: bigint -1 <= true ==> true
// CHECK-NEXT: bigint -1 >  true ==> false
// CHECK-NEXT: bigint -1 >= true ==> false
// CHECK-NEXT: true <  bigint -1 ==> false
// CHECK-NEXT: true <= bigint -1 ==> false
// CHECK-NEXT: true >  bigint -1 ==> true
// CHECK-NEXT: true >= bigint -1 ==> true

printComparisonsAndResult("0n vs false ", zero, false);
// CHECK-LABEL: 0n vs false
// CHECK-NEXT: bigint 0 <  false ==> false
// CHECK-NEXT: bigint 0 <= false ==> true
// CHECK-NEXT: bigint 0 >  false ==> false
// CHECK-NEXT: bigint 0 >= false ==> true
// CHECK-NEXT: false <  bigint 0 ==> false
// CHECK-NEXT: false <= bigint 0 ==> true
// CHECK-NEXT: false >  bigint 0 ==> false
// CHECK-NEXT: false >= bigint 0 ==> true

printComparisonsAndResult("1n vs false", one, false);
// CHECK-LABEL: 1n vs false
// CHECK-NEXT: bigint 1 <  false ==> false
// CHECK-NEXT: bigint 1 <= false ==> false
// CHECK-NEXT: bigint 1 >  false ==> true
// CHECK-NEXT: bigint 1 >= false ==> true
// CHECK-NEXT: false <  bigint 1 ==> true
// CHECK-NEXT: false <= bigint 1 ==> true
// CHECK-NEXT: false >  bigint 1 ==> false
// CHECK-NEXT: false >= bigint 1 ==> false

printComparisonsAndResult("-1n vs false", negOne, false);
// CHECK-LABEL: -1n vs false
// CHECK-NEXT: bigint -1 <  false ==> true
// CHECK-NEXT: bigint -1 <= false ==> true
// CHECK-NEXT: bigint -1 >  false ==> false
// CHECK-NEXT: bigint -1 >= false ==> false
// CHECK-NEXT: false <  bigint -1 ==> false
// CHECK-NEXT: false <= bigint -1 ==> false
// CHECK-NEXT: false >  bigint -1 ==> true
// CHECK-NEXT: false >= bigint -1 ==> true

//////////////////////////////////////
//
// BigInt vs undefined comparison.
//
//////////////////////////////////////
printComparisonsAndResult("0n vs undefined ", zero, undefined);
// CHECK-LABEL: 0n vs undefined
// CHECK-NEXT: bigint 0 <  undefined ==> false
// CHECK-NEXT: bigint 0 <= undefined ==> false
// CHECK-NEXT: bigint 0 >  undefined ==> false
// CHECK-NEXT: bigint 0 >= undefined ==> false
// CHECK-NEXT: undefined <  bigint 0 ==> false
// CHECK-NEXT: undefined <= bigint 0 ==> false
// CHECK-NEXT: undefined >  bigint 0 ==> false
// CHECK-NEXT: undefined >= bigint 0 ==> false

printComparisonsAndResult("1n vs undefined", one, undefined);
// CHECK-LABEL: 1n vs undefined
// CHECK-NEXT: bigint 1 <  undefined ==> false
// CHECK-NEXT: bigint 1 <= undefined ==> false
// CHECK-NEXT: bigint 1 >  undefined ==> false
// CHECK-NEXT: bigint 1 >= undefined ==> false
// CHECK-NEXT: undefined <  bigint 1 ==> false
// CHECK-NEXT: undefined <= bigint 1 ==> false
// CHECK-NEXT: undefined >  bigint 1 ==> false
// CHECK-NEXT: undefined >= bigint 1 ==> false

printComparisonsAndResult("-1n vs undefined", negOne, undefined);
// CHECK-LABEL: -1n vs undefined
// CHECK-NEXT: bigint -1 <  undefined ==> false
// CHECK-NEXT: bigint -1 <= undefined ==> false
// CHECK-NEXT: bigint -1 >  undefined ==> false
// CHECK-NEXT: bigint -1 >= undefined ==> false
// CHECK-NEXT: undefined <  bigint -1 ==> false
// CHECK-NEXT: undefined <= bigint -1 ==> false
// CHECK-NEXT: undefined >  bigint -1 ==> false
// CHECK-NEXT: undefined >= bigint -1 ==> false

//////////////////////////////////////
//
// BigInt vs null comparison.
//
//////////////////////////////////////
printComparisonsAndResult("0n vs null ", zero, null);
// CHECK-LABEL: 0n vs null
// CHECK-NEXT: bigint 0 <  null ==> false
// CHECK-NEXT: bigint 0 <= null ==> true
// CHECK-NEXT: bigint 0 >  null ==> false
// CHECK-NEXT: bigint 0 >= null ==> true
// CHECK-NEXT: null <  bigint 0 ==> false
// CHECK-NEXT: null <= bigint 0 ==> true
// CHECK-NEXT: null >  bigint 0 ==> false
// CHECK-NEXT: null >= bigint 0 ==> true

printComparisonsAndResult("1n vs null", one, null);
// CHECK-LABEL: 1n vs null
// CHECK-NEXT: bigint 1 <  null ==> false
// CHECK-NEXT: bigint 1 <= null ==> false
// CHECK-NEXT: bigint 1 >  null ==> true
// CHECK-NEXT: bigint 1 >= null ==> true
// CHECK-NEXT: null <  bigint 1 ==> true
// CHECK-NEXT: null <= bigint 1 ==> true
// CHECK-NEXT: null >  bigint 1 ==> false
// CHECK-NEXT: null >= bigint 1 ==> false

printComparisonsAndResult("-1n vs null", negOne, null);
// CHECK-LABEL: -1n vs null
// CHECK-NEXT: bigint -1 <  null ==> true
// CHECK-NEXT: bigint -1 <= null ==> true
// CHECK-NEXT: bigint -1 >  null ==> false
// CHECK-NEXT: bigint -1 >= null ==> false
// CHECK-NEXT: null <  bigint -1 ==> false
// CHECK-NEXT: null <= bigint -1 ==> false
// CHECK-NEXT: null >  bigint -1 ==> true
// CHECK-NEXT: null >= bigint -1 ==> true

//////////////////////////////////////
//
// BigInt vs String comparison.
//
//////////////////////////////////////
printComparisonsAndResult("123456789123456789123456789123456789123456789n vs \"123456789123456789123456789123456789123456789\"", BigInt("123456789123456789123456789123456789123456789"), "123456789123456789123456789123456789123456789")
// CHECK-LABEL: 123456789123456789123456789123456789123456789n vs "123456789123456789123456789123456789123456789"
// CHECK-NEXT: bigint 123456789123456789123456789123456789123456789 <  string 123456789123456789123456789123456789123456789 ==> false
// CHECK-NEXT: bigint 123456789123456789123456789123456789123456789 <= string 123456789123456789123456789123456789123456789 ==> true
// CHECK-NEXT: bigint 123456789123456789123456789123456789123456789 >  string 123456789123456789123456789123456789123456789 ==> false
// CHECK-NEXT: bigint 123456789123456789123456789123456789123456789 >= string 123456789123456789123456789123456789123456789 ==> true
// CHECK-NEXT: string 123456789123456789123456789123456789123456789 <  bigint 123456789123456789123456789123456789123456789 ==> false
// CHECK-NEXT: string 123456789123456789123456789123456789123456789 <= bigint 123456789123456789123456789123456789123456789 ==> true
// CHECK-NEXT: string 123456789123456789123456789123456789123456789 >  bigint 123456789123456789123456789123456789123456789 ==> false
// CHECK-NEXT: string 123456789123456789123456789123456789123456789 >= bigint 123456789123456789123456789123456789123456789 ==> true

printComparisonsAndResult("-999999999999999999999999999999999999999999999999999999n vs \"-999999999999999999999999999999999999999999999999999999\"", BigInt("-999999999999999999999999999999999999999999999999999999"), "-999999999999999999999999999999999999999999999999999999")
// CHECK-LABEL: -999999999999999999999999999999999999999999999999999999n vs "-999999999999999999999999999999999999999999999999999999"
// CHECK-NEXT: bigint -999999999999999999999999999999999999999999999999999999 <  string -999999999999999999999999999999999999999999999999999999 ==> false
// CHECK-NEXT: bigint -999999999999999999999999999999999999999999999999999999 <= string -999999999999999999999999999999999999999999999999999999 ==> true
// CHECK-NEXT: bigint -999999999999999999999999999999999999999999999999999999 >  string -999999999999999999999999999999999999999999999999999999 ==> false
// CHECK-NEXT: bigint -999999999999999999999999999999999999999999999999999999 >= string -999999999999999999999999999999999999999999999999999999 ==> true
// CHECK-NEXT: string -999999999999999999999999999999999999999999999999999999 <  bigint -999999999999999999999999999999999999999999999999999999 ==> false
// CHECK-NEXT: string -999999999999999999999999999999999999999999999999999999 <= bigint -999999999999999999999999999999999999999999999999999999 ==> true
// CHECK-NEXT: string -999999999999999999999999999999999999999999999999999999 >  bigint -999999999999999999999999999999999999999999999999999999 ==> false
// CHECK-NEXT: string -999999999999999999999999999999999999999999999999999999 >= bigint -999999999999999999999999999999999999999999999999999999 ==> true

printComparisonsAndResult("1n vs \"0.999999\"", one, "0.999999");
// CHECK-LABEL: 1n vs "0.999999"
// CHECK-NEXT: bigint 1 <  string 0.999999 ==> false
// CHECK-NEXT: bigint 1 <= string 0.999999 ==> false
// CHECK-NEXT: bigint 1 >  string 0.999999 ==> false
// CHECK-NEXT: bigint 1 >= string 0.999999 ==> false
// CHECK-NEXT: string 0.999999 <  bigint 1 ==> false
// CHECK-NEXT: string 0.999999 <= bigint 1 ==> false
// CHECK-NEXT: string 0.999999 >  bigint 1 ==> false
// CHECK-NEXT: string 0.999999 >= bigint 1 ==> false
