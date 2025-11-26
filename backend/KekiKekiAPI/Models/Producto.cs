using System;
using System.Collections.Generic;

namespace KekiKekiAPI.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public string? Image { get; set; }

    public string? Category { get; set; }
}
