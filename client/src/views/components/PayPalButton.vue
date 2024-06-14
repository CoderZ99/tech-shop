<template>
  <div id="paypal-button-container"></div>
</template>

<script setup>
  import { onMounted } from "vue"

  const props = defineProps({
    payAmount: {
      type: [Number, String],
      required: true,
    },
  })

  const clientId =
    "AYtNOjomjOwF-U4T4Tpe1qwx2yleKMbQQLpfROwsgSZiguYQ6Jsyvxvq3W0GGUg_kcznbxJLfQHTfOY5"

  const loadPayPalScript = () => {
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons`
    script.onload = renderPayPalButtons
    document.body.appendChild(script)
  }

  const renderPayPalButtons = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: props.payAmount,
                },
              },
            ],
          })
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            console.table(
              `Transaction completed by ${details.payer.name.given_name}`
            )
            // Handle successful transaction here
          })
        },
        onError: (err) => {
          console.error(err)
          // Handle error here
        },
      })
      .render("#paypal-button-container")
  }

  onMounted(() => {
    loadPayPalScript()
  })
</script>
