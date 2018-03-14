export default function renderDOM(child, root) {
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    root.appendChild(child);
}