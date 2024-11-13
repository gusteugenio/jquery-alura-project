
function insertIntoScore() {
  var tableBody = $(".score").find("tbody");
  var user = "Gustavo";
  var wordsCount = $("#wordCount").text();

  var row = newRow(user, wordsCount);
  row.find(".deleteButton").click((removeRow));

  tableBody.append(row);
}

function newRow(user, wordsCount) {
  var row = $("<tr>");
  var nameColumn = $("<td>").text(user);
  var wordsColumn = $("<td>").text(wordsCount);
  var deleteColumn = $("<td>");
  var link = $("<a>").addClass("deleteButton").attr("href", "#");
  var trashIcon = $("<i>").addClass("material-icons").text("delete_forever");

  link.append(trashIcon);

  deleteColumn.append(link);

  row.append(nameColumn);
  row.append(wordsColumn);
  row.append(deleteColumn);

  return row;
}

function removeRow() {
  event.preventDefault();
  $(this).parent().parent().remove();
}
