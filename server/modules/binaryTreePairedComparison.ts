/**
 * @fileoverview Implementation of the binary-tree method for
 * efficient paired comparisons "Efficient method
 * for paired comparison", Silverstein & Farrell
 * Journal of Electronic Imaging (2001) 10(2), 394–398
 */

type BinaryTreeNode = {
  idx: number;
  imageId: string;
  parent?: BinaryTreeNode;
  left?: BinaryTreeNode;
  right?: BinaryTreeNode;
};

export const newNode = (
  idx: number,
  imageId: string,
  left?: BinaryTreeNode,
  right?: BinaryTreeNode,
  parent?: BinaryTreeNode
): BinaryTreeNode => {
  return { idx, imageId, left, right, parent };
};
