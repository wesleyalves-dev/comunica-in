export function showModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal.showModal();
}

export function closeModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal.close();
}
