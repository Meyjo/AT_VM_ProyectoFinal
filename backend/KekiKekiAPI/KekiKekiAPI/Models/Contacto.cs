using System;
using System.Collections.Generic;

namespace KekiKekiAPI.Models;

public partial class Contacto
{
    public int? Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Message { get; set; }
}
