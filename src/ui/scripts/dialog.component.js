/**
 * @typedef {Object} dialogProps
 * @property {string} elementId
 * @property {boolean} showConfirmationButton
 * @property {boolean} showCancelButton
 * @property {string} dialogMessage
 */

export function renderDialog(dialogProps) {
  const {
    elementId,
    showConfirmationButton = false,
    showCancelButton = false,
    dialogMessage
  } = dialogProps

  const dialog = `
    <p class="dialog__mesage"> ${dialogMessage} </p>
    <div class="dialog__button-group">
      ${showConfirmationButton ? '<button class="button button--accent" id="dialog-confirmation-button"> Aceptar </button>' : ''}
      ${showCancelButton ? '<button class="button button--danger" id ="dialog-cancel-button"> Cancelar </button>' : ''}
    </div>
  `

  const dialogElement = document.getElementById(elementId)

  if (!dialogElement) {
    throw new Error('cannot find dialog container element')
  }

  dialogElement.innerHTML('beforeend', dialog)
}