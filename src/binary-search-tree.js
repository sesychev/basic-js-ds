const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    if (!this.rootTree) {
      this.rootTree = new Node(data);
    }

    if (this.has(data)) {
      return;
    } else {
      let node = this.rootTree;
      let last = node;

      while (node) {
        last = node;
        if (data < node.data) {
          node = node.left;
        } else {
          node = node.right;
        }
      }

      if (data < last.data) {
        last.left = new Node(data);
      } else {
        last.right = new Node(data);
      }
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    let node = this.rootTree;

    while (node) {
      if (node.data === data) {
        return node;
      } else if (data < node.data) {
        node = node.left;
      } else if (data > node.data) {
        node = node.right;
      }
    }

    return null;
  }

  remove(data) {
    this.rootTree = removeIt(this.rootTree, data);

    function removeIt(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeIt(node.left, data);

        return node;
      } else if (data > node.data) {
        node.right = removeIt(node.right, data);
      } else {
        if (!node.left && !node.right) {
          node = null;

          return node;
        }

        if (!node.left) {
          node = node.right;

          return node;
        }

        if (!node.right) {
          node = node.left;

          return node;
        }

        let temp = node.right;

        while (temp.left) {
          temp = temp.left;
        }

        node.data = temp.data;
        node.right = removeIt(node.right, temp.data);

        return node;
      }

      return node;
    }
  }

  min() {
    let node = this.rootTree;

    if (!node) {
      return null;
    }

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.rootTree;

    if (!node) {
      return null;
    }

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
