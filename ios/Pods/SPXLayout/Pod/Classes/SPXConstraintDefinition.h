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


/**
 Provides a mutable object for defining a constraint. Generally this is constructed for you and should not be used directly. However if you need some custom behaviour not yet supported by SPXLayout then this is how you should define your constraints. Then call -addConstraintDefinition: on your layout object
 */
@interface SPXConstraintDefinition : NSObject


/**
 *  The priority to apply to this constraint
 */
@property (nonatomic, assign) SPXLayoutPriority priority;


/**
 *  The constant to apply to this constraint
 */
@property (nonatomic, assign) CGFloat constant;


/**
 *  The multiplier to apply to this constraint
 */
@property (nonatomic, assign) CGFloat multiplier;


/**
 *  The relation to apply to this constraint
 */
@property (nonatomic, assign) NSLayoutRelation relation;


/**
 *  The first attribute associated with this constraint
 */
@property (nonatomic, assign) NSLayoutAttribute firstAttribute;


/**
 *  The second attribute associated with this constraint
 */
@property (nonatomic, assign) NSLayoutAttribute secondAttribute;


/**
 *  The first view associated with this constraint
 */
@property (nonatomic, weak) SPXView *firstView;


/**
 *  The second attribute associated with this constraint
 */
@property (nonatomic, weak) SPXView *secondView;


/**
 *  The view to apply this constraint to
 */
@property (nonatomic, weak, readonly) SPXView *viewToApplyConstraint;


/**
 *  The resulting NSLayoutConstraint. The constraint is only constructed when this method is called and a new instance will be returned always, so you shouldn't rely on this being the final added constraint
 */
@property (nonatomic, strong, readonly) NSLayoutConstraint *constraint;


/**
 *  Convenience constructor -- returns a newly configured constraint definition
 *
 *  @param view The view this constraint will be applied to
 *
 *  @return A newly configured constraint definition
 */
+ (instancetype)definitionForView:(SPXView *)view;


@end

