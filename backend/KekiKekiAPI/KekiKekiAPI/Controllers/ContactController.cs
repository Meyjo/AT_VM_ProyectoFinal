using KekiKekiAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using KekiKekiAPI.Models.DTOs;

namespace KekiKekiAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : Controller
    {
        private readonly KekiKeiContext _kekiKeiContext;

        public ContactController(KekiKeiContext kekiKeiContext)
        {
            _kekiKeiContext = kekiKeiContext;
        }
        [HttpGet]
        [Route("contact")]
        [AllowAnonymous]
        public async Task <IActionResult> GetContact()
        {
            var contactMessages = await _kekiKeiContext.Contactos.ToListAsync();
            return Ok(new {isSuccess = true, contactMessages = contactMessages});
        }

        [HttpPost]
        [Route("contact")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateContact([FromBody] ContactDTO newContact)
        {
            var contactModel = new Contacto { Name = newContact.Name, Email = newContact.Email, Message = newContact.Message };
            await _kekiKeiContext.Contactos.AddAsync(contactModel);
            await _kekiKeiContext.SaveChangesAsync();
            if(contactModel.Id == 0)
            {
                return BadRequest(new { message = "Error al crear el contacto" });
            }
            return Ok(new { isSuccess = true, contactMessages = contactModel });
        }
    }
}
