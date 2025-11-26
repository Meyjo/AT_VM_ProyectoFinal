using System;
using System.Collections.Generic;

namespace KekiKekiAPI.Models;

public partial class Pedido
{
    public int Id { get; set; }

    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }

    public DateTime? Date { get; set; }

    public decimal? Total { get; set; }
}
