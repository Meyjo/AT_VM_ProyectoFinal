using KekiKekiAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using KekiKekiAPI.Models.DTOs;

namespace KekiKekiAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly KekiKeiContext _kekiKeiContext;

        public OrderController(KekiKeiContext kekiKeiContext)
        {
            _kekiKeiContext = kekiKeiContext;
        }

        [HttpGet]
        [Route("orders")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProducts()
        {
            var orders = await _kekiKeiContext.Pedidos.ToListAsync();
            return Ok(new { isSuccess = true, orders = orders });
        }

        [HttpPost]
        [Route("orders")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateProduct([FromBody] OrderDTO newOrder)
        {
            var orderModel = new Pedido { Total = newOrder.Total, Name = newOrder.Name, Address = newOrder.Address, Phone = newOrder.Phone };
            await _kekiKeiContext.Pedidos.AddAsync(orderModel);
            await _kekiKeiContext.SaveChangesAsync();
            if (orderModel.Id == 0)
            {
                return BadRequest(new { message = "Error al crear el pedido" });
            }
            return Ok(new { isSuccess = true, product = orderModel });
        }
    }
}
