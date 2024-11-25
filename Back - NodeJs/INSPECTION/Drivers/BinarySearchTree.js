class TreeNode {
    constructor(data) {
        this.data = data; // Contendrá el conductor
        this.left = null;  // Hijo izquierdo
        this.right = null; // Hijo derecho
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insertar un nuevo nodo en el árbol
    insert(data) {
        const newNode = new TreeNode(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data.user_id < node.data.user_id) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // Buscar un conductor por user_id
    search(user_id) {
        return this.searchNode(this.root, user_id);
    }

    searchNode(node, user_id) {
        if (node === null) {
            return null;
        }
        if (user_id === node.data.user_id) {
            return node.data;
        }
        if (user_id < node.data.user_id) {
            return this.searchNode(node.left, user_id);
        } else {
            return this.searchNode(node.right, user_id);
        }
    }

    // Recorrido en orden (in-order traversal)
    inOrder(node = this.root, result = []) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.data);
            this.inOrder(node.right, result);
        }
        return result;
    }
}

module.exports = BinarySearchTree;
