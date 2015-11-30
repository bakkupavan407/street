<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Client.aspx.cs" Inherits="Client" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div>
            <asp:TextBox ID="txt_op" runat="server" ></asp:TextBox>
        </div>
        <asp:Button ID="btn_service" runat="server" Text="Call HelloWorld" OnClick="btn_service_Click" />
    </div>
    </form>
</body>
</html>
