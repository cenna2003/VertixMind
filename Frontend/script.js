// frontend/script.js
const API_URL = 'http://localhost:3000/api/items';

async function loadItems() {
  const res = await fetch(API_URL);
  const items = await res.json();
  const list = document.getElementById('itemList');
  list.innerHTML = items.map(i => `<li>${i.name}</li>`).join('');
}

document.getElementById('itemForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('itemName').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  document.getElementById('itemName').value = '';
  loadItems();
});

loadItems();