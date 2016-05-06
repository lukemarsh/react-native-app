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
#import "SPXConstraintDefinition.h"

@class SPXViewLayout, SPXMultiViewLayout;


/**
 *  Provides a layout class for performing programmatic AutoLayout operations with ease
 */
@interface SPXLayout : NSObject


/**
 *  Applies various layout attributes to a view
 *
 *  @param view   The view to layout
 *  @param layout The layout operations
 *
 *  @return An array of NSLayoutConstraint instances
 */
+ (nonnull NSArray *)applyLayoutToView:(nonnull SPXView *)view layout:(nonnull void (^)(SPXViewLayout * __nonnull layout, SPXView * __nonnull view))layout;


/**
 *  Applies various layout attributes to multiple views, relative to a reference view
 *
 *  @param views  The views to layout
 *  @param view   The reference view, applicable in some cases
 *  @param layout The layout operations
 *
 *  @return An array of NSLayoutConstraint instances
 */
+ (nonnull NSArray *)applyLayoutToViews:(nonnull NSArray *)views referenceView:(nullable SPXView *)view layout:(nonnull void (^)(SPXMultiViewLayout * __nonnull layout, SPXView * __nonnull referenceView))layout;


/**
 *  Adds a constraint definition directly to the layout
 *
 *  @param definition The definition
 */
- (void)addConstraintDefinition:(nonnull SPXConstraintDefinition *)definition;


@end



/**
 *  Provides a single view layout object
 */
@interface SPXViewLayout : SPXLayout


/**
 *  Pin's the edge of one view to another
 *
 *  @param edge      The edge of the first view to pin
 *  @param otherEdge The edge of the second view to pin
 *  @param view      The view to pin to
 *  @param margin    The margin to apply to this pin
 *
 *  @return A new NSLayoutConstraint instance
 */
- (nonnull id)pinEdge:(SPXEdge)edge toEdge:(SPXEdge)otherEdge referenceView:(nonnull SPXView *)view margin:(CGFloat)margin;


/**
 *  Pin's the edges of one view to another view's edges
 *
 *  @param edges   The edges to pin
 *  @param view    The reference view to pin to
 *  @param margins The margins to apply to these pins
 *
 *  @return A new NSLayoutConstraint instance
 */
- (nonnull id)pinEdges:(SPXEdgeMask)edges referenceView:(nonnull SPXView *)view margins:(SPXEdgeMargins)margins;


/**
 *  Centers this view to the reference view
 *
 *  @param axis   The axis to center
 *  @param view   The view to align to
 *  @param offset The offset to apply
 *
 *  @return A new NSLayoutConstraint instance
 */
- (nonnull id)centerAxis:(SPXAxis)axis toView:(nonnull SPXView *)view offset:(CGFloat)offset;


/**
 *  Sizes this view to a specific size
 *
 *  @param axis     The axis to size
 *  @param relation The relationship to apply
 *  @param size     The size for this axis
 *
 *  @return A new NSLayoutConstraint instance
 */
- (nonnull id)sizeAxis:(SPXAxis)axis relation:(NSLayoutRelation)relation toSize:(CGFloat)size;


/**
 *  Sizes this view relative to a reference view
 *
 *  @param axis      The axis to size for this view
 *  @param otherAxis The axis of the reference view to use
 *  @param view      The reference view to use
 *  @param ratio     The ratio to apply to this sizing
 *
 *  @return A new NSLayoutConstraint instance
 */
- (nonnull id)sizeAxis:(SPXAxis)axis againstAxis:(SPXAxis)otherAxis referenceView:(nonnull SPXView *)view ratio:(CGFloat)ratio;


@end



/**
 *  Provides a multi-view layout object
 */
@interface SPXMultiViewLayout : SPXViewLayout


/**
 *  Sizes all of the views relative to the reference
 *
 *  @param axis  The axis to size
 *  @param ratio The ratio to apply to this sizing
 *
 *  @return A new NSLayoutConstraint instance
 */
- (nonnull id)sizeAxis:(SPXAxis)axis ratio:(CGFloat)ratio;


@end

