<template>
  <form name="form1" method="post" action="">
    <table>
      <tr><td>Tool</td><td>{{name}}</td></tr>
      <tr><td colspan="2">Please rate your experience</td></tr>
      <tr><td>Rating</td><td><select name="rating">
        <option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></td></tr>
      <tr>
        <td>Your comment</td>
        <td><textarea name="feedback" class='' placeholder='Leave your feedback here' maxlength="140" onkeydown="if(this.value.length>=140) {event.returnValue=false}"></textarea><br>Max. 140 characters</td>
      </tr>
    </table>
    <input type="submit" value="Submit" />
  </form>
</template>

<script>
export default {
  name: 'feedbackTemplate'
}
</script>
