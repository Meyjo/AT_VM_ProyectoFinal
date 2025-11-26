using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace KekiKekiAPI.Models;

public partial class KekiKeiContext : DbContext
{
    public KekiKeiContext()
    {
    }

    public KekiKeiContext(DbContextOptions<KekiKeiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Contacto> Contactos { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<ProductoPedido> ProductoPedidos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contacto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__contacto__3213E83F66113697");

            entity.ToTable("contacto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Message)
                .HasMaxLength(4000)
                .HasColumnName("message");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__pedido__3213E83F8B20A68A");

            entity.ToTable("pedido");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.Total)
                .HasColumnType("money")
                .HasColumnName("total");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Address)
                .HasMaxLength(512)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__producto__3213E83F09053016");

            entity.ToTable("producto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Category)
                .HasMaxLength(128)
                .IsUnicode(false)
                .HasColumnName("category");
            entity.Property(e => e.Description)
                .HasMaxLength(512)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Image)
                .HasMaxLength(512)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
        });

        modelBuilder.Entity<ProductoPedido>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("producto_pedido");

            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Pedido).HasColumnName("pedido");
            entity.Property(e => e.Producto).HasColumnName("producto");
            entity.Property(e => e.Subtotal)
                .HasColumnType("money")
                .HasColumnName("subtotal");

            entity.HasOne(d => d.PedidoNavigation).WithMany()
                .HasForeignKey(d => d.Pedido)
                .HasConstraintName("FK_producto_pedido_pedido");

            entity.HasOne(d => d.ProductoNavigation).WithMany()
                .HasForeignKey(d => d.Producto)
                .HasConstraintName("FK_producto_pedido_producto");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
