<template>
  <div>
    <!-- <ModalNotAllowed v-if="$store.state.selectedDevice" :dialog="$store.state.modalsStates.notAllowed" />
		<ModalLockDevice v-if="$store.state.selectedDevice" :dialog="$store.state.modalsStates.lockDevice" />
		<ModalLostPhone v-if="$store.state.selectedDevice" :dialog="$store.state.modalsStates.lostPhone" />
		<ModalWipeData v-if="$store.state.selectedDevice" :dialog="$store.state.modalsStates.wipeData" />
		<ModalSecurityNet :dialog="$store.state.modalsStates.securityNet" />
		<ModalUserProfile  :dialog="$store.state.modalsStates.editProfile" /> -->
    <ModalPaymentStatus
      v-if="
        $store.state.modalsStates.paymentStatus.open &&
        $store.state.modalsStates.paymentStatus.data
      "
      :dialog="
        $store.state.modalsStates.paymentStatus.open &&
        $store.state.modalsStates.paymentStatus.data
      "
    />
  </div>
</template>

<script>
// import ModalNotAllowed from './ModalNotAllowed'
// import ModalLockDevice from './ModalLockDevice'
// import ModalLostPhone from './ModalLostPhone'
// import ModalWipeData from './ModalWipeData'
// import ModalSecurityNet from './ModalSecurityNet'
// import ModalUserProfile from './ModalUserProfile'
import ModalPaymentStatus from "./ModalPaymentStatus";
export default {
  name: "Index",
  components: {
    // ModalLockDevice,
    // ModalLostPhone,
    // ModalWipeData,
    // ModalSecurityNet,
    // ModalUserProfile,
    ModalPaymentStatus,
    // ModalNotAllowed,
  },
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>
