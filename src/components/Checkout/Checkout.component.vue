<template>
  <v-btn block id="rzp-button1" color="secondary"
    >PAY {{ amount }} & CHECKOUT</v-btn
  >
</template>
<script src=""></script>

<script>
export default {
  props: ["amount", "email"],
  methods: {
    paymentSuccessEvent() {
      this.$emit("paymentSuccessEvent");
    },
  },

  mounted() {
    const vm = this;
    var options = {
      key: "rzp_test_TcoZBdZe3W3Ltz",
      amount: this.amount * 100,
      currency: "MYR",
      name: "My Trav Package",
      description: "Payment Gateway",
      prefill: {
        email: this.email,
        contact: "+60",
      },
      theme: {
        color: "#3399cc",
      },
    };
    options.handler = function (response) {
      PaymentInterface.success();
      vm.paymentSuccessEvent();
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      PaymentInterface.error();
      alert("Payment failed, please try again.");
    });

    document.getElementById("rzp-button1").onclick = function (e) {
      rzp1.open();
      e.preventDefault();
    };
  },
};
</script>
