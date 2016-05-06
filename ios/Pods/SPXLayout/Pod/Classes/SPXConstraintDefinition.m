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

#import "SPXConstraintDefinition.h"

@interface NSLayoutConstraint ()
- (NSString *)asciiArtDescription;
@end


@interface SPXConstraintDefinition ()
@property (nonatomic, weak) SPXView *viewToApplyConstraints;
@property (nonatomic, strong) NSLayoutConstraint *constraint;
@end

@implementation SPXConstraintDefinition

+ (instancetype)definitionForView:(SPXView *)view
{
  SPXConstraintDefinition *def = [SPXConstraintDefinition new];
  view.translatesAutoresizingMaskIntoConstraints = NO;
  
  def.firstView = view;
  def.viewToApplyConstraints = view.superview;
  def.priority = 750;
  def.multiplier = 1;
  
  return def;
}

- (NSLayoutConstraint *)finalConstraint
{
  return _constraint ?: self.constraint;
}

- (NSLayoutConstraint *)constraint
{
  NSLayoutConstraint *constraint = [NSLayoutConstraint new];
  constraint = [NSLayoutConstraint constraintWithItem:self.firstView
                                            attribute:self.firstAttribute
                                            relatedBy:self.relation
                                               toItem:self.secondView
                                            attribute:self.secondAttribute
                                           multiplier:self.multiplier
                                             constant:self.constant];
  
  _constraint = constraint;
  return _constraint;
}

- (void)setMultiplier:(CGFloat)multiplier
{
  NSAssert(multiplier > 0, @"Multiplier must be greater than 0");
  _multiplier = multiplier;
}

#ifdef DEBUG
- (NSString *)description
{
  return self.constraint.asciiArtDescription;
}
#endif

@end

