<template>
    <div class="credits-board">
        <div class="credit-title">
            {{credit_title}}
        </div>
        <div class="credit-names">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CreditsBoard',
  props: {
    credit_title: String
  }
}
</script>

<style scoped>
.credits-board {
  padding: 1.5rem;
  background-color: white;
  margin: 1rem;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  box-shadow: 3px 3px #888888;
  display: inline-block;
}

.credit-title {
  font-family: 'Architects Daughter';
  font-size: 2rem;
  color: #E73332;
  font-weight: bold;;
}

.credit-names {
  font-family: 'Patrick Hand';
  font-size: 1.5rem;
  line-height: 1px;
}
</style>
