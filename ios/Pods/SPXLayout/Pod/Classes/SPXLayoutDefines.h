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

#import "SPXLayout+CrossPlatform.h"

#ifndef _SPX_LAYOUT_DEFINES
#define _SPX_LAYOUT_DEFINES


#ifndef SPXMaskHasOption
#define SPXMaskHasOption(mask, option) ((mask & option) == option)
#endif


/**
 *  Defines the axiis available for a view
 */
typedef NS_ENUM(NSUInteger, SPXAxis){
  /**
   *  Defines a horizontal axis
   */
  SPXAxisHorizontal,
  /**
   *  Defines a vertical axis
   */
  SPXAxisVertical,
};


/**
 *  Defines the edge of a view
 */
typedef NS_ENUM(NSUInteger, SPXEdge){
  /**
   *  Defines the top edge of a view
   */
  SPXEdgeTop      = 0,
  /**
   *  Defines the left edge of a view
   */
  SPXEdgeLeft     = 1,
  /**
   *  Defines the bottom edge of a view
   */
  SPXEdgeBottom   = 2,
  /**
   *  Defines the right edge of a view
   */
  SPXEdgeRight    = 3,
};


/**
 *  Defines the available edge masks
 */
typedef NS_ENUM(NSUInteger, SPXEdgeMask){
  /**
   *  Defines a top edge mask
   */
  SPXEdgeMaskTop     = 4 << SPXEdgeTop,
  /**
   *  Defines a left edge mask
   */
  SPXEdgeMaskLeft    = 4 << SPXEdgeLeft,
  /**
   *  Defines a bottom edge mask
   */
  SPXEdgeMaskBottom  = 4 << SPXEdgeBottom,
  /**
   *  Defines a right edge mask
   */
  SPXEdgeMaskRight   = 4 << SPXEdgeRight,
  /**
   *  Defines a top & bottom edge mask
   */
  SPXEdgeMaskTopAndBottom = SPXEdgeMaskTop | SPXEdgeMaskBottom,
  /**
   *  Defines a left & right edge mask
   */
  SPXEdgeMaskLeftAndRight = SPXEdgeMaskLeft | SPXEdgeMaskRight,
  /**
   *  Defines a top, left, bottom, right edge mask
   */
  SPXEdgeMaskAll     = SPXEdgeMaskTop | SPXEdgeMaskLeft | SPXEdgeMaskBottom | SPXEdgeMaskRight,
};


/**
 *  Defines a set of margins for each edge
 */
typedef struct SPXEdgeMargins {
  CGFloat top, left, bottom, right;
} SPXEdgeMargins;



/**
 *  Defines a function for making edge margins
 *
 *  @param top    The top margin
 *  @param left   The left margin
 *  @param bottom The bottom margin
 *  @param right  The right margin
 *
 *  @return A new SPXEdgeMargins struct
 */
extern SPXEdgeMargins SPXEdgeMarginsMake(CGFloat top, CGFloat left, CGFloat bottom, CGFloat right);


/**
 *  Defines a function for making edge margins with equal margins
 *
 *  @param margin The margin to apply to each edge
 *
 *  @return A new SPXEdgeMargins struct
 */
extern SPXEdgeMargins SPXEdgeMarginsAll(CGFloat margin);


/**
 *  Defines a constant with no margins
 */
extern const SPXEdgeMargins SPXEdgeMarginsZero;


/**
 *  Convenience (internal) function for returning a sizing NSLayoutAttribute from an SPXAxis
 *
 *  @param axis The axis
 *
 *  @return An NSLayoutAttribute
 */
extern NSLayoutAttribute attributeForWidthAxis(SPXAxis axis);


/**
 *  Convenience (internal) function for returning an NSLayoutAttribute from an SPXEdge
 *
 *  @param edge The edge
 *
 *  @return An NSLayoutAttribute
 */
extern NSLayoutAttribute attributeForEdge(SPXEdge edge);


/**
 *  Convenience (internal) function for returning a centering NSLayoutAttribute from an SPXAxis
 *
 *  @param axis The axis
 *
 *  @return An NSLayoutAttribute
 */
extern NSLayoutAttribute attributeForCenterAxis(SPXAxis axis);


#endif

