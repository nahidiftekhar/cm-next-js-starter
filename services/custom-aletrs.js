import Swal from 'sweetalert2';

export const showAlert = async ({
  icon,
  title,
  body,
  html,
  confirmationRequired,
  timeToShow,
  callbackOnConfirm,
}) => {
  const result = await Swal.fire({
    icon: icon,
    title: title,
    text: body,
    html: html,
    padding: '2em',
    customClass: 'sweet-alerts',
    showConfirmButton: confirmationRequired || false,
    timer: confirmationRequired ? undefined : (timeToShow || 3000),
  });

  // Trigger callback only if confirmationRequired and user clicked confirm
  if (confirmationRequired && result.isConfirmed && typeof callbackOnConfirm === 'function') {
    callbackOnConfirm();
  }
};
