/*
   Copyright (c) 2015 Snippex. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 
 1. Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 
 2. Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 
 THIS SOFTWARE IS PROVIDED BY Snippex `AS IS' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 EVENT SHALL Snippex OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#import "SPXLayoutDefines.h"

SPXEdgeMargins SPXEdgeMarginsMake(CGFloat top, CGFloat left, CGFloat bottom, CGFloat right) {
  SPXEdgeMargins margins = {top, left, bottom, right};
  return margins;
}

SPXEdgeMargins SPXEdgeMarginsAll(CGFloat margin) {
  return SPXEdgeMarginsMake(margin, margin, margin, margin);
}

NSLayoutAttribute attributeForWidthAxis(SPXAxis axis) {
  switch (axis) {
    case SPXAxisHorizontal:
      return NSLayoutAttributeWidth;
    case SPXAxisVertical:
      return NSLayoutAttributeHeight;
  }
}

NSLayoutAttribute attributeForCenterAxis(SPXAxis axis) {
  switch (axis) {
    case SPXAxisHorizontal:
      return NSLayoutAttributeCenterX;
    case SPXAxisVertical:
      return NSLayoutAttributeCenterY;
  }
}

NSLayoutAttribute attributeForEdge(SPXEdge edge) {
  switch (edge) {
    case SPXEdgeTop:
      return NSLayoutAttributeTop;
    case SPXEdgeLeft:
      return NSLayoutAttributeLeft;
    case SPXEdgeBottom:
      return NSLayoutAttributeBottom;
    case SPXEdgeRight:
      return NSLayoutAttributeRight;
  }
}

CGFloat SPXConstantZero = CGFLOAT_MIN;

const SPXEdgeMargins SPXEdgeMarginsZero = { 0, 0, 0, 0 };


