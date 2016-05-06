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

#import "SPXLayout.h"

@interface SPXConstraintDefinition (Private)
- (NSLayoutConstraint *)finalConstraint;
@property (nonatomic, weak) SPXView *viewToApplyConstraints;
@end

@interface SPXLayout ()
@property (nonatomic, strong) NSMutableArray *constraintDefinitions;
@property (nonatomic, weak) SPXView *view;
- (SPXConstraintDefinition *)constraintForDefinition:(void (^)(SPXConstraintDefinition *definition))block forView:(SPXView *)view;
@end

@implementation SPXViewLayout

#pragma mark - Pinning

- (id)pinEdge:(SPXEdge)edge toEdge:(SPXEdge)otherEdge referenceView:(SPXView *)view margin:(CGFloat)margin
{
  return [self constraintForDefinition:^(SPXConstraintDefinition *definition) {
    definition.constant = margin;
    definition.secondView = view;
    definition.firstAttribute = attributeForEdge(edge);
    definition.secondAttribute = attributeForEdge(otherEdge);
  } forView:self.view];
}

- (id)pinEdges:(SPXEdgeMask)edges referenceView:(SPXView *)view margins:(SPXEdgeMargins)margins
{
  NSMutableArray *definitions = [NSMutableArray new];
  
  if (SPXMaskHasOption(edges, SPXEdgeMaskTop)) {
    [self pinEdge:SPXEdgeTop toEdge:SPXEdgeTop referenceView:view ?: self.view.superview margin:margins.top];
  }
  
  if (SPXMaskHasOption(edges, SPXEdgeMaskBottom)) {
    [self pinEdge:SPXEdgeBottom toEdge:SPXEdgeBottom referenceView:view ?: self.view.superview margin:-margins.bottom];
  }
  
  if (SPXMaskHasOption(edges, SPXEdgeMaskLeft)) {
    [self pinEdge:SPXEdgeLeft toEdge:SPXEdgeLeft referenceView:view ?: self.view.superview margin:margins.left];
  }
  
  if (SPXMaskHasOption(edges, SPXEdgeMaskRight)) {
    [self pinEdge:SPXEdgeRight toEdge:SPXEdgeRight referenceView:view ?: self.view.superview margin:-margins.right];
  }
  
  return definitions;
}

#pragma mark - Centering

- (id)centerAxis:(SPXAxis)axis toView:(SPXView *)view offset:(CGFloat)offset
{
  return [self constraintForDefinition:^(SPXConstraintDefinition *definition) {
    definition.constant = offset;
    definition.secondView = view;
    definition.firstAttribute = attributeForCenterAxis(axis);
    definition.secondAttribute = attributeForCenterAxis(axis);
  } forView:self.view];
}

#pragma mark - Sizing

- (id)sizeAxis:(SPXAxis)axis relation:(NSLayoutRelation)relation toSize:(CGFloat)size
{
  return [self constraintForDefinition:^(SPXConstraintDefinition *definition) {
    definition.constant = size;
    definition.relation = relation;
    definition.firstAttribute = attributeForWidthAxis(axis);
    definition.secondAttribute = attributeForWidthAxis(axis);
  } forView:self.view];
}

- (id)sizeAxis:(SPXAxis)axis againstAxis:(SPXAxis)otherAxis referenceView:(SPXView *)view ratio:(CGFloat)ratio
{
  return [self constraintForDefinition:^(SPXConstraintDefinition *definition) {
    definition.secondView = view ?: self.view;
    definition.multiplier = ratio;
    definition.firstAttribute = attributeForWidthAxis(axis);
    definition.secondAttribute = attributeForWidthAxis(otherAxis);
  } forView:self.view];
}

@end


@interface SPXMultiViewLayout ()
@property (nonatomic, strong) NSHashTable *views;
@property (nonatomic, weak) SPXView *referenceView;
@end

@implementation SPXMultiViewLayout

- (id)pinEdge:(SPXEdge)edge toEdge:(SPXEdge)otherEdge referenceView:(SPXView *)view margin:(CGFloat)margin
{
  return [self constraintsForDefinition:^SPXConstraintDefinition *{
    return [super pinEdge:edge toEdge:otherEdge referenceView:view margin:margin];
  }];
}

- (id)pinEdges:(SPXEdgeMask)edges referenceView:(SPXView *)view margins:(SPXEdgeMargins)margins
{
  return [self constraintsForDefinition:^SPXConstraintDefinition *{
    return [super pinEdges:edges referenceView:view margins:margins];
  }];
}

- (id)centerAxis:(SPXAxis)axis toView:(SPXView *)view offset:(CGFloat)offset
{
  return [self constraintsForDefinition:^SPXConstraintDefinition *{
    return [super centerAxis:axis toView:view offset:offset];
  }];
}

- (id)sizeAxis:(SPXAxis)axis relation:(NSLayoutRelation)relation toSize:(CGFloat)size
{
  return [self constraintsForDefinition:^SPXConstraintDefinition *{
    return [super sizeAxis:axis relation:relation toSize:size];
  }];
}

- (id)sizeAxis:(SPXAxis)axis againstAxis:(SPXAxis)otherAxis referenceView:(SPXView *)view ratio:(CGFloat)ratio
{
  return [self constraintsForDefinition:^SPXConstraintDefinition *{
    return [super sizeAxis:axis againstAxis:otherAxis referenceView:view ratio:ratio];
  }];
}
 
- (nonnull id)sizeAxis:(SPXAxis)axis ratio:(CGFloat)ratio
{
  return [self constraintsForDefinition:^SPXConstraintDefinition *{
    return [super sizeAxis:axis againstAxis:axis referenceView:self.referenceView ratio:ratio];
  }];
}

- (id)distributeOnAxis:(SPXAxis)axis inView:(SPXView *)view
{
  return nil; // <-- checkout FLK for this one and possible others!!
}

#pragma mark - Helper

- (NSArray *)constraintsForDefinition:(SPXConstraintDefinition* (^)(void))block
{
  NSMutableArray *definitions = [NSMutableArray new];
  
  for (SPXView *view in self.views) {
    self.view = view;
    SPXConstraintDefinition *definition = block();
    [definitions addObject:definition];
  }
  
  return definitions;
}

@end


@implementation SPXLayout

#pragma mark - Application

+ (NSArray *)applyLayoutToView:(SPXView *)view layout:(void (^)(SPXViewLayout *, SPXView *))block
{
  NSAssert(view, @"You must provide a view");
  NSAssert(block, @"You must provide a block");
  
  SPXViewLayout *layout = [SPXViewLayout new];
  layout.view = view;
  layout.view.translatesAutoresizingMaskIntoConstraints = NO;
  
  !block ?: block(layout, view);
  return [layout applyDefinitions];
}

+ (NSArray *)applyLayoutToViews:(NSArray *)views referenceView:(SPXView *)view layout:(void (^)(SPXMultiViewLayout *, SPXView *))block
{
  NSAssert(views.count, @"You must provide at least one view");
  NSAssert(block, @"You must provide a block");
  
  SPXMultiViewLayout *layout = [SPXMultiViewLayout new];
  layout.views = [NSHashTable weakObjectsHashTable];
  
  for (SPXView *view in views) {
    view.translatesAutoresizingMaskIntoConstraints = NO;
    [layout.views addObject:view];
  }
  
  layout.referenceView = view ?: views.firstObject;
  !block ?: block(layout, layout.referenceView);
  return [layout applyDefinitions];
}

- (NSArray *)applyDefinitions
{
  NSMutableArray *constraints = [NSMutableArray new];
  
  for (SPXConstraintDefinition *definition in self.constraintDefinitions) {
    NSLayoutConstraint *constraint = [definition finalConstraint];
    if (constraint) {
      [definition.viewToApplyConstraints addConstraint:constraint];
      [constraints addObject:constraint];
    } else {
      NSLog(@"Unable to generate constraint for definition: %@", definition);
    }
  }
  
  return constraints.copy;
}

#pragma mark - Definitions

- (NSMutableArray *)constraintDefinitions
{
  return _constraintDefinitions ?: (_constraintDefinitions = [NSMutableArray new]);
}

- (void)addConstraintDefinition:(SPXConstraintDefinition *)definition
{
  [self.constraintDefinitions addObject:definition];
}

- (SPXConstraintDefinition *)constraintForDefinition:(void (^)(SPXConstraintDefinition *definition))block forView:(SPXView *)view
{
  SPXConstraintDefinition *def = [SPXConstraintDefinition definitionForView:view];
  !block ?: block(def);
  [self addConstraintDefinition:def];
  return def;
}

@end

