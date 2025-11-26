using KekiKekiAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using KekiKekiAPI.Models.DTOs;
using System.Security.Claims;

namespace KekiKekiAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly KekiKeiContext _kekiKeiContext;

        public ProductController(KekiKeiContext kekiKeiContext)
        {
            _kekiKeiContext = kekiKeiContext;
        }

        [HttpGet]
        [Route("products")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _kekiKeiContext.Productos.ToListAsync();
            return Ok(new { isSuccess = true, products = products });
        }

        [HttpGet]
        [Route("categories")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _kekiKeiContext.Productos.Select(p => p.Category).Distinct().ToListAsync();
            return Ok(new { isSuccess = true, categories = categories });
        }

        [HttpPost]
        [Route("products")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateProduct([FromBody] ProductDTO newProduct)
        {
            var productModel = new Producto { Name = newProduct.Name, Description = newProduct.Description, Price = newProduct.Price, Image = newProduct.Image, Category = newProduct.Category };
            await _kekiKeiContext.Productos.AddAsync(productModel);
            await _kekiKeiContext.SaveChangesAsync();
            if (productModel.Id == 0)
            {
                return BadRequest(new { message = "Error al crear el producto" });
            }
            return Ok(new { isSuccess = true, product = productModel });
        }

        [HttpDelete]
        [Route("products/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var product = await _kekiKeiContext.Productos.FindAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Producto no encontrado" });
            }
            _kekiKeiContext.Productos.Remove(product);
            await _kekiKeiContext.SaveChangesAsync();
            return Ok(new { isSuccess = true });
        }
    }
}
