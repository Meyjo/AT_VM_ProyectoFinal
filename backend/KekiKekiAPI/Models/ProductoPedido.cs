using System;
using System.Collections.Generic;

namespace KekiKekiAPI.Models;

public partial class ProductoPedido
{
    public int Id { get; set; }

    public int? Pedido { get; set; }

    public int? Producto { get; set; }

    public int? Cantidad { get; set; }

    public decimal? Subtotal { get; set; }

    public virtual Pedido? PedidoNavigation { get; set; }

    public virtual Producto? ProductoNavigation { get; set; }
}
