store.member.forEach((member) => {
  store.memberHtml += `<div id="info" class="col-4 box">
      <h5>Account History</h5>
        <p>DATE: ${member.name}</p>
        <p>BALANCE: ${member.balance}</p>
      <form class='update-member' data-id=${member._id}>
      <input name="member[balance]" type="balance" placeholder="balance">
      <input type="submit" value="Update">
      </form>
      <button class='delete-member' data-id=${member._id}>Remove</button>
    </div>
    `;
});
