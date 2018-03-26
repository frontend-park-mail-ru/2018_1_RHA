/**
 * Removes children of the root element and puts new child into it
 * @param {HTMLDivElement} child
 * @param {HTMLDivElement} root
 */
export default function renderDOM(child, root) {
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    root.appendChild(child);
}