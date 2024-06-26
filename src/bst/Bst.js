const Node = require('../models/Node');


class BinarySearchTree {
  constructor(value1) {
    this.value1 = null;
    this.root = null;
  }

  insert(key, value) {
    const newNode = new Node(key, value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.key.localeCompare(node.key) < 0) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            this._insertNode(node.left, newNode);
        }
    } else if (newNode.key.localeCompare(node.key) > 0) {
        if (node.right === null) {
            node.right = newNode;
        } else {
            this._insertNode(node.right, newNode);
        }
    } else {
        node.value = newNode.value;  // Atualiza o valor se a chave já existe
    }
}
  //remover Nó
  remove(key) {
    this.root = this._removeNode(this.root, key);
  }

  _removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.key) {
      node.left = this._removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this._removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let aux = this.findMinNode(node.right);
      node.key = aux.key;
      node.value = aux.value;
      node.right = this._removeNode(node.right, aux.key);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  search(key) {
    return this._searchNode(this.root, key);
  }

  _searchNode(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      return this._searchNode(node.left, key);
    } else if (key > node.key) {
      return this._searchNode(node.right, key);
    } else {
      return key + ":" + node.value; // Encontrado
    }
  }

  inOrder() {
    const result = [];
    this._inOrderHelper(this.root, result);
    return result;
  }

  _inOrderHelper(node, result) {
    if (node !== null) {
      this._inOrderHelper(node.left, result);
      result.push({ key: node.key, value: node.value });
      this._inOrderHelper(node.right, result);
    }
  }

  preOrder() {
    const result = [];
    this._preOrderHelper(this.root, result);
    return result;
  }

  _preOrderHelper(node, result) {
    if (node !== null) {
      result.push({ key: node.key, value: node.value });
      this._preOrderHelper(node.left, result);
      this._preOrderHelper(node.right, result);
    }
  }

  postOrder() {
    const result = [];
    this._postOrderHelper(this.root, result);
    return result;
  }

  _postOrderHelper(node, result) {
    if (node !== null) {
      this._postOrderHelper(node.left, result);
      this._postOrderHelper(node.right, result);
      result.push({ key: node.key, value: node.value });
    }
  }

  startsWith() {
    let result = [];
    this._startsWithHelper(this.root, result);
    return result;
  }

  _startsWithHelper(node, result) {
    if (node !== null) {
      if (node.key.startsWith(this.value1)) {
        result.push({ key: node.key, value: node.value });
      }
      this._startsWithHelper(node.left, result);
      this._startsWithHelper(node.right, result);
    }
  }
}
const bts = new BinarySearchTree();




module.exports = BinarySearchTree;
