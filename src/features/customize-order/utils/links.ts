import { EMAIL, FRONT_END_BASE_URL, WHATSAPP_NO } from "../../../utils/helpers/constants";
import type { OrderRequest } from "../hooks/useOrderRequests";


export const generateWhatsAppLink = (data: OrderRequest) => {

    const message =  `
Hello, I am ${data.name}

I see that my order request (ID: ${data.id}) has been approved. I would like to get more details about the next steps.

You can view the order here: ${FRONT_END_BASE_URL}/profile/requests/${data.id}

Thank you!

  `;

    const encodedMessage = encodeURIComponent(message.trim());
    return `https://wa.me/${WHATSAPP_NO}?text=${encodedMessage}`;
};
export const generateEmailLink = (data: OrderRequest) => {
  const subject = `Customized Order Request - ID ${data.id}`;

  const body = `
Hello,

I see that my order request (ID: ${data.id}) has been approved. I would like to get more details about the next steps.

You can view the order here: ${FRONT_END_BASE_URL}/profile/requests/${data.id}

Thank you!

Best regards,
${data.name}
  `;

  const encodedSubject = encodeURIComponent(subject.trim());
  const encodedBody = encodeURIComponent(body.trim());

  return `mailto:${EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
};



import Swal from "sweetalert2";

export const handleContact = (order: OrderRequest) => {
  Swal.fire({
    title: "Contact Customer",
    text: "Choose a method to contact the customer.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "WhatsApp",
    cancelButtonText: "Email",
  }).then((result) => {
    if (result.isConfirmed) {
      const waLink = generateWhatsAppLink(order);
      window.open(waLink, "_blank");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      const emailLink = generateEmailLink(order);
      window.open(emailLink, "_blank");
    }
  });
};
