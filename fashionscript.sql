USE [SMSFashion]
GO
/****** Object:  UserDefinedTableType [dbo].[AddreddList]    Script Date: 2/12/2020 5:22:54 PM ******/
CREATE TYPE [dbo].[AddreddList] AS TABLE(
	[UID] [int] NULL,
	[Address] [varchar](500) NULL,
	[Town] [varchar](100) NULL,
	[City] [varchar](100) NULL,
	[Pincode] [int] NULL,
	[State] [varchar](100) NULL,
	[Type] [varchar](50) NULL,
	[avaldays] [varchar](100) NULL,
	[Time] [varchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[itemsizes]    Script Date: 2/12/2020 5:22:54 PM ******/
CREATE TYPE [dbo].[itemsizes] AS TABLE(
	[itm_id] [int] NULL,
	[price] [float] NULL,
	[care] [varchar](100) NULL,
	[quantity] [int] NULL,
	[itm_length] [varchar](100) NULL,
	[color] [varchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[itm_description]    Script Date: 2/12/2020 5:22:54 PM ******/
CREATE TYPE [dbo].[itm_description] AS TABLE(
	[itm_id] [int] NULL,
	[itm_descp] [varchar](1) NULL,
	[bid] [int] NULL,
	[price] [float] NULL,
	[care] [varchar](100) NULL,
	[color] [varchar](1) NULL,
	[features] [varchar](1) NULL,
	[heel_height] [varchar](1) NULL,
	[heel_type] [varchar](1) NULL,
	[itm_sz_id] [int] NULL,
	[attached_sleeves] [varchar](100) NULL,
	[Sleeve_Length] [varchar](100) NULL,
	[occasion] [varchar](100) NULL,
	[item_mid] [int] NULL,
	[quantity] [int] NULL,
	[neck_type] [varchar](100) NULL,
	[sleeves_material] [varchar](100) NULL,
	[itm_wtid] [int] NULL,
	[itm_length] [varchar](100) NULL,
	[product_code] [varchar](100) NULL,
	[model_no] [varchar](100) NULL,
	[shipping_charges] [int] NULL,
	[offer] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[itmdescription]    Script Date: 2/12/2020 5:22:54 PM ******/
CREATE TYPE [dbo].[itmdescription] AS TABLE(
	[itm_id] [int] NULL,
	[itm_descp] [varchar](100) NULL,
	[bid] [int] NULL,
	[price] [float] NULL,
	[care] [varchar](100) NULL,
	[color] [varchar](100) NULL,
	[features] [varchar](100) NULL,
	[heel_height] [varchar](100) NULL,
	[heel_type] [varchar](100) NULL,
	[itm_sz_id] [int] NULL,
	[attached_sleeves] [varchar](100) NULL,
	[Sleeve_Length] [varchar](100) NULL,
	[occasion] [varchar](100) NULL,
	[item_mid] [int] NULL,
	[quantity] [int] NULL,
	[neck_type] [varchar](100) NULL,
	[sleeves_material] [varchar](100) NULL,
	[itm_wtid] [int] NULL,
	[itm_length] [varchar](100) NULL,
	[product_code] [varchar](100) NULL,
	[model_no] [varchar](100) NULL,
	[shipping_charges] [int] NULL,
	[offer] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[itms_sizes]    Script Date: 2/12/2020 5:22:54 PM ******/
CREATE TYPE [dbo].[itms_sizes] AS TABLE(
	[itm_id] [int] NULL,
	[price] [float] NULL,
	[quantity] [int] NULL,
	[itm_length] [int] NULL,
	[color] [varchar](100) NULL,
	[itm_size] [varchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[product_subcat_ids_list_tbltype]    Script Date: 2/12/2020 5:22:54 PM ******/
CREATE TYPE [dbo].[product_subcat_ids_list_tbltype] AS TABLE(
	[n] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[n] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[vendorlist]    Script Date: 2/12/2020 5:22:54 PM ******/
CREATE TYPE [dbo].[vendorlist] AS TABLE(
	[vid] [int] NULL,
	[prod_subcat_id] [int] NULL
)
GO
/****** Object:  UserDefinedFunction [dbo].[SplitString]    Script Date: 2/12/2020 5:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[SplitString]
(    
      @Input NVARCHAR(MAX),
      @Character CHAR(1)
)
RETURNS @Output TABLE (
      Item NVARCHAR(1000)
)
AS
BEGIN
      DECLARE @StartIndex INT, @EndIndex INT
 
      SET @StartIndex = 1
      IF SUBSTRING(@Input, LEN(@Input) - 1, LEN(@Input)) <> @Character
      BEGIN
            SET @Input = @Input + @Character
      END
 
      WHILE CHARINDEX(@Character, @Input) > 0
      BEGIN
            SET @EndIndex = CHARINDEX(@Character, @Input)
           
            INSERT INTO @Output(Item)
            SELECT SUBSTRING(@Input, @StartIndex, @EndIndex - 1)
           
            SET @Input = SUBSTRING(@Input, @EndIndex + 1, LEN(@Input))
      END
 
      RETURN
END
GO
/****** Object:  Table [dbo].[Address]    Script Date: 2/12/2020 5:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[AID] [int] IDENTITY(1,1) NOT NULL,
	[UID] [int] NOT NULL,
	[Address] [varchar](500) NOT NULL,
	[Town] [varchar](100) NULL,
	[City] [varchar](100) NULL,
	[Pincode] [int] NOT NULL,
	[State] [varchar](100) NULL,
	[Type] [varchar](50) NULL,
	[avaldays] [varchar](100) NULL,
	[Time] [varchar](50) NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brands]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brands](
	[bid] [int] IDENTITY(2001,1) NOT NULL,
	[Bname] [varchar](100) NULL,
	[b_img] [varchar](150) NULL,
	[offer_img] [varchar](150) NULL,
	[offer] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[bid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ErrorLog]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ErrorLog](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[Level] [varchar](max) NOT NULL,
	[CallSite] [varchar](max) NOT NULL,
	[Type] [varchar](max) NOT NULL,
	[Message] [varchar](max) NOT NULL,
	[StackTrace] [varchar](max) NOT NULL,
	[InnerException] [varchar](max) NULL,
	[AdditionalInfo] [varchar](max) NULL,
	[LoggedOnDate] [datetime] NOT NULL,
	[Logger] [varchar](max) NOT NULL,
	[Application] [varchar](max) NOT NULL,
	[CurrentUser] [varchar](100) NULL,
 CONSTRAINT [pk_logs] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[item_material]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[item_material](
	[item_mid] [int] IDENTITY(1,1) NOT NULL,
	[material_type] [varchar](50) NOT NULL,
 CONSTRAINT [PK_item_material] PRIMARY KEY CLUSTERED 
(
	[item_mid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Item_Orders]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Item_Orders](
	[ord_id] [int] IDENTITY(1,1) NOT NULL,
	[uid] [int] NULL,
	[itm_id] [varchar](max) NULL,
	[ord_date] [date] NULL,
	[ord_status] [varchar](100) NULL,
	[payment_mode] [varchar](150) NULL,
	[expe_dvy_date] [date] NULL,
	[actl_dvy] [date] NULL,
	[Address] [int] NULL,
	[phone] [varchar](10) NULL,
	[amount] [int] NULL,
	[shipping_charges] [int] NULL,
	[Total_amount] [int] NULL,
	[cardno] [varchar](15) NULL,
	[cardname] [varchar](150) NULL,
	[expmonth] [int] NULL,
	[expyear] [int] NULL,
	[cvv] [int] NULL,
	[itms_qunty] [varchar](max) NULL,
	[itms_sizes] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ord_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[item_style]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[item_style](
	[items_sid] [int] IDENTITY(1,1) NOT NULL,
	[itemstyle] [varchar](50) NOT NULL,
 CONSTRAINT [PK_itemstyle] PRIMARY KEY CLUSTERED 
(
	[items_sid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[item_worktype]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[item_worktype](
	[itm_wtid] [int] IDENTITY(1,1) NOT NULL,
	[worktype] [varchar](50) NULL,
 CONSTRAINT [PK_item_worktype] PRIMARY KEY CLUSTERED 
(
	[itm_wtid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[itemdescription]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[itemdescription](
	[itm_descp_id] [int] IDENTITY(1,1) NOT NULL,
	[itm_id] [int] NOT NULL,
	[itm_descp] [varchar](500) NOT NULL,
	[bid] [int] NOT NULL,
	[care] [varchar](100) NULL,
	[features] [varchar](50) NULL,
	[heel_height] [varchar](100) NULL,
	[heel_type] [varchar](100) NULL,
	[attached_sleeves] [varchar](100) NULL,
	[Sleeve_Length] [int] NULL,
	[occasion] [varchar](100) NULL,
	[item_mid] [int] NOT NULL,
	[neck_type] [varchar](100) NULL,
	[sleeves_material] [varchar](100) NULL,
	[itm_wtid] [int] NOT NULL,
	[product_code] [varchar](100) NULL,
	[model_no] [varchar](150) NULL,
	[shipping_charges] [int] NULL,
	[offer] [int] NULL,
 CONSTRAINT [PK_itemdescription] PRIMARY KEY CLUSTERED 
(
	[itm_descp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Itemesizes]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Itemesizes](
	[itm_sz_id] [int] IDENTITY(1,1) NOT NULL,
	[itm_id] [int] NULL,
	[price] [float] NULL,
	[quantity] [int] NULL,
	[itm_length] [int] NULL,
	[color] [varchar](100) NULL,
	[itm_size] [varchar](100) NULL,
 CONSTRAINT [PK__Itemesiz__3B8D5FFECDCE9A79] PRIMARY KEY CLUSTERED 
(
	[itm_sz_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Items]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[itm_id] [int] IDENTITY(1,1) NOT NULL,
	[it_name] [varchar](200) NULL,
	[cat_img] [varchar](200) NULL,
	[prod_subcat_id] [int] NOT NULL,
	[vid] [int] NOT NULL,
 CONSTRAINT [PK__Items__C9F9A4F348DF5688] PRIMARY KEY CLUSTERED 
(
	[itm_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Items_Bag]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items_Bag](
	[bag_id] [int] IDENTITY(301,1) NOT NULL,
	[uid] [int] NULL,
	[itm_id] [int] NULL,
	[size] [varchar](100) NULL,
	[price] [int] NULL,
	[qunty] [int] NULL,
	[status] [varchar](50) NULL,
	[ord_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[bag_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[items_brand]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[items_brand](
	[itembid] [int] NOT NULL,
	[itembrandname] [varchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Items_Description]    Script Date: 2/12/2020 5:22:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items_Description](
	[itm_descp_id] [int] IDENTITY(1,1) NOT NULL,
	[itm_id] [int] NULL,
	[itm_descp] [varchar](500) NOT NULL,
	[brandname] [varchar](200) NOT NULL,
	[price] [float] NOT NULL,
	[care] [varchar](100) NULL,
	[attached_sleeves] [varchar](100) NULL,
	[Sleeve_Length] [varchar](100) NULL,
	[occasion] [varchar](100) NULL,
	[color] [varchar](100) NULL,
	[material_type] [varchar](150) NULL,
	[no_of_pcs] [int] NULL,
	[transparency] [varchar](100) NULL,
	[itm_style_type] [varchar](100) NULL,
	[neck_type] [varchar](100) NULL,
	[sleeves_material] [varchar](100) NULL,
	[work] [varchar](100) NULL,
	[prints_pattern] [varchar](100) NULL,
	[itm_length] [int] NULL,
	[fabric] [varchar](150) NULL,
	[product_code] [varchar](100) NULL,
	[blouse_length] [varchar](200) NULL,
	[blouse_material] [varchar](200) NULL,
	[pallu] [varchar](100) NULL,
	[blouse_work] [varchar](100) NULL,
	[blouse_attached] [varchar](100) NULL,
	[sleeve_fabric] [varchar](100) NULL,
	[waist_rise] [varchar](100) NULL,
	[closure] [varchar](100) NULL,
	[width] [varchar](100) NULL,
	[toe_type] [varchar](100) NULL,
	[heel_height] [varchar](100) NULL,
	[heel_type] [varchar](100) NULL,
	[outer_material] [varchar](100) NULL,
	[strap_material] [varchar](100) NULL,
	[warranty] [varchar](150) NULL,
	[item_weight] [varchar](100) NULL,
	[dial_diameter] [varchar](100) NULL,
	[dial_shape] [varchar](150) NULL,
	[dial_color] [varchar](150) NULL,
	[strap_color] [varchar](150) NULL,
	[features] [varchar](150) NULL,
	[model_no] [varchar](150) NULL,
	[shoe_pouch_included] [varchar](100) NULL,
	[sole_material] [varchar](100) NULL,
	[IS_active] [varchar](50) NULL,
	[shipping_charges] [int] NULL,
	[offer] [int] NULL,
	[bid] [int] NULL,
 CONSTRAINT [PK__Items_De__527D652696541E86] PRIMARY KEY CLUSTERED 
(
	[itm_descp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[itm_img_catlogs]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[itm_img_catlogs](
	[itm_img_cat_id] [int] IDENTITY(1,1) NOT NULL,
	[itm_id] [int] NULL,
	[Images] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[itm_img_cat_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[itmcolor]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[itmcolor](
	[itm_colorid] [int] IDENTITY(1,1) NOT NULL,
	[itm_id] [int] NOT NULL,
	[itm_color] [varchar](50) NOT NULL,
 CONSTRAINT [PK_itmcolor] PRIMARY KEY CLUSTERED 
(
	[itm_colorid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OID] [int] IDENTITY(1001,1) NOT NULL,
	[uid] [int] NULL,
	[aid] [int] NULL,
	[phone] [varchar](10) NULL,
	[amount] [int] NULL,
	[shippingchrgs] [int] NULL,
	[totalamount] [int] NULL,
	[paymentmode] [varchar](150) NULL,
	[cardname] [varchar](100) NULL,
	[cardno] [varchar](15) NULL,
	[expmonth] [int] NULL,
	[expyear] [int] NULL,
	[cvv] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[OID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_sizes]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_sizes](
	[itm_sz_id] [int] IDENTITY(1,1) NOT NULL,
	[itm_size] [varchar](50) NULL,
	[pd_cat_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[itm_sz_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products_Category]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products_Category](
	[prod_cat_id] [int] IDENTITY(10,10) NOT NULL,
	[pcName] [varchar](200) NOT NULL,
	[PID] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__Products__892313063C8426BD] PRIMARY KEY CLUSTERED 
(
	[prod_cat_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products_Subcategory]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products_Subcategory](
	[prod_subcat_id] [int] IDENTITY(1,1) NOT NULL,
	[pscName] [varchar](150) NOT NULL,
	[prod_cat_id] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__Products__BED7707B77865385] PRIMARY KEY CLUSTERED 
(
	[prod_subcat_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products_Types]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products_Types](
	[PID] [int] IDENTITY(100,1) NOT NULL,
	[PName] [varchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK__Products__B2FAB3F1CE066B37] PRIMARY KEY CLUSTERED 
(
	[PID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tblroles] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblEmployee]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblEmployee](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](20) NOT NULL,
	[City] [varchar](20) NOT NULL,
	[Department] [varchar](20) NOT NULL,
	[Gender] [varchar](6) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Password] [varchar](10) NOT NULL,
	[PhoneNo] [varchar](10) NOT NULL,
	[Gender] [varchar](10) NOT NULL,
	[OTP] [int] NULL,
	[Image] [varchar](200) NULL,
	[RoleID] [int] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendor]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendor](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[VID] [int] NOT NULL,
	[Logo] [varchar](200) NULL,
	[DOR] [smalldatetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Vendor] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendor_Products]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendor_Products](
	[Vpid] [int] IDENTITY(1,1) NOT NULL,
	[Vid] [int] NOT NULL,
	[prod_subcat_id] [int] NOT NULL,
	[createdby] [varchar](50) NULL,
	[createdon] [smalldatetime] NULL,
	[updatedby] [varchar](50) NULL,
	[updatedon] [smalldatetime] NULL,
	[isactive] [bit] NOT NULL,
 CONSTRAINT [PK_Vendor_Products] PRIMARY KEY CLUSTERED 
(
	[Vpid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WhishList]    Script Date: 2/12/2020 5:22:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WhishList](
	[wh_id] [int] IDENTITY(1,1) NOT NULL,
	[uid] [int] NULL,
	[itm_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[wh_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Address] ON 
GO
INSERT [dbo].[Address] ([AID], [UID], [Address], [Town], [City], [Pincode], [State], [Type], [avaldays], [Time]) VALUES (1, 2, N'1-34', N'SEETHAMPETA', N'vizag', 530016, N'a.p', N'Home', N'Weekend', N'AnyTime')
GO
INSERT [dbo].[Address] ([AID], [UID], [Address], [Town], [City], [Pincode], [State], [Type], [avaldays], [Time]) VALUES (2, 2, N'1-89', N'MADURWADA', N'vizag', 530016, N'a.p', N'Office', N'Weekend', N'9 A.M TO 9.P.M')
GO
INSERT [dbo].[Address] ([AID], [UID], [Address], [Town], [City], [Pincode], [State], [Type], [avaldays], [Time]) VALUES (6, 1, N'F.No-102', N'slm', N'vsp', 531026, N'ap', N'Home', NULL, N'')
GO
INSERT [dbo].[Address] ([AID], [UID], [Address], [Town], [City], [Pincode], [State], [Type], [avaldays], [Time]) VALUES (7, 1, N'9-21', N'SLM', N'VSP', 531026, N'AP', N'Office', NULL, N'')
GO
SET IDENTITY_INSERT [dbo].[Address] OFF
GO
SET IDENTITY_INSERT [dbo].[Brands] ON 
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2001, N'Tommy-hilfiger', N'tommy.jpg', N'tommy.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2002, N'Jack&Jones', N'jack.jpg', N'jack.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2003, N'Puma', N'puma.jpg', N'puma.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2004, N'The_Roadster', N'The_Roadster.jpg', N'The_Roadster.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2005, N'Fossil', N'Fossil.jpg', N'Fossil.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2006, N'Nike', N'Nike.jpg', N'Nike.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2007, N'UCB', N'UCB.jpg', N'UCB.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2008, N'Biba', N'Biba.jpg', N'Biba.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2009, N'Sassafras', N'Sassafras.jpg', N'Sassafras.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2010, N'Dorothy_perkins', N'DP.jpg', N'DP.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2011, N'W', N'W.jpg', N'W.jpg', NULL)
GO
INSERT [dbo].[Brands] ([bid], [Bname], [b_img], [offer_img], [offer]) VALUES (2012, N'WROGN', N'wrogn.jpg', N'wrogn.jpg', NULL)
GO
SET IDENTITY_INSERT [dbo].[Brands] OFF
GO
SET IDENTITY_INSERT [dbo].[item_material] ON 
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (1, N'BroadclothNULL')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (2, N'Brocade
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (3, N'Chenile Fabric')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (4, N'Indian cotton
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (5, N'Cotton
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (6, N'Flax
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (7, N'Wool')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (8, N'Ramie')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (9, N'Silk
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (10, N'Crepe
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (11, N'Muslin
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (12, N'Velvet
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (13, N'Denim
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (14, N'Corduroy
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (15, N'Felt
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (16, N'Chiffon
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (17, N'Flannel
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (18, N'Damask
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (19, N'Gabardine
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (20, N'Voile
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (21, N'Lawn Cloth
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (22, N'Tweed
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (23, N'Poplin
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (24, N'Polar Fleece
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (25, N'Chintz
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (26, N'Taffeat
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (27, N'Organza
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (28, N'Gingham
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (29, N'Batiste
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (30, N'Organdy
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (31, N'Georgette
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (32, N'Gauze
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (33, N'Charmeuse
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (34, N'Madras
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (35, N'Lame
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (36, N'Sateen
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (37, N'Plush
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (38, N'Jeans
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (39, N'Tartan
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (40, N'Foulard
')
GO
INSERT [dbo].[item_material] ([item_mid], [material_type]) VALUES (41, N'Percale
')
GO
SET IDENTITY_INSERT [dbo].[item_material] OFF
GO
SET IDENTITY_INSERT [dbo].[Item_Orders] ON 
GO
INSERT [dbo].[Item_Orders] ([ord_id], [uid], [itm_id], [ord_date], [ord_status], [payment_mode], [expe_dvy_date], [actl_dvy], [Address], [phone], [amount], [shipping_charges], [Total_amount], [cardno], [cardname], [expmonth], [expyear], [cvv], [itms_qunty], [itms_sizes]) VALUES (4, 2, N'7,5,', CAST(N'2018-12-28' AS Date), N'Ordered Taken', N'COD', CAST(N'2019-01-04' AS Date), CAST(N'2019-01-04' AS Date), 1, N'9988776655', 1229, 0, 1229, N'', N'', 0, 0, 0, NULL, NULL)
GO
INSERT [dbo].[Item_Orders] ([ord_id], [uid], [itm_id], [ord_date], [ord_status], [payment_mode], [expe_dvy_date], [actl_dvy], [Address], [phone], [amount], [shipping_charges], [Total_amount], [cardno], [cardname], [expmonth], [expyear], [cvv], [itms_qunty], [itms_sizes]) VALUES (5, 2, N'6,9,', CAST(N'2018-12-28' AS Date), N'Ordered Taken', N'COD', CAST(N'2019-01-04' AS Date), CAST(N'2019-01-04' AS Date), 1, N'9988776655', 950, 0, 950, N'', N'', 0, 0, 0, NULL, NULL)
GO
INSERT [dbo].[Item_Orders] ([ord_id], [uid], [itm_id], [ord_date], [ord_status], [payment_mode], [expe_dvy_date], [actl_dvy], [Address], [phone], [amount], [shipping_charges], [Total_amount], [cardno], [cardname], [expmonth], [expyear], [cvv], [itms_qunty], [itms_sizes]) VALUES (6, 2, N'6,7,4,4,4,', CAST(N'2019-05-07' AS Date), N'Ordered Taken', N'COD', CAST(N'2019-05-14' AS Date), CAST(N'2019-05-14' AS Date), 2, N'9988776655', 4020, 0, 4020, N'', N'', 0, 0, 0, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Item_Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[item_worktype] ON 
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (1, N'Aari
')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (2, N'Chikankari
')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (3, N'Kantha
')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (4, N'Kashidakari
')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (5, N'Mirror work
')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (6, N'Phulkari
 ')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (7, N'Rajasthani patchwork
')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (8, N'Zardozi
')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (9, N'Fabric Paint')
GO
INSERT [dbo].[item_worktype] ([itm_wtid], [worktype]) VALUES (10, N'Oil Paint')
GO
SET IDENTITY_INSERT [dbo].[item_worktype] OFF
GO
SET IDENTITY_INSERT [dbo].[itemdescription] ON 
GO
INSERT [dbo].[itemdescription] ([itm_descp_id], [itm_id], [itm_descp], [bid], [care], [features], [heel_height], [heel_type], [attached_sleeves], [Sleeve_Length], [occasion], [item_mid], [neck_type], [sleeves_material], [itm_wtid], [product_code], [model_no], [shipping_charges], [offer]) VALUES (4, 7, N'pure cotton', 2002, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, NULL, NULL, 1, NULL, NULL, 0, 0)
GO
INSERT [dbo].[itemdescription] ([itm_descp_id], [itm_id], [itm_descp], [bid], [care], [features], [heel_height], [heel_type], [attached_sleeves], [Sleeve_Length], [occasion], [item_mid], [neck_type], [sleeves_material], [itm_wtid], [product_code], [model_no], [shipping_charges], [offer]) VALUES (5, 8, N'pure cotton', 2004, N'water wash', NULL, NULL, NULL, NULL, 0, NULL, 20, NULL, NULL, 2, NULL, NULL, 0, 0)
GO
INSERT [dbo].[itemdescription] ([itm_descp_id], [itm_id], [itm_descp], [bid], [care], [features], [heel_height], [heel_type], [attached_sleeves], [Sleeve_Length], [occasion], [item_mid], [neck_type], [sleeves_material], [itm_wtid], [product_code], [model_no], [shipping_charges], [offer]) VALUES (6, 12, N'pure cotton', 2002, N'water wash', NULL, NULL, NULL, NULL, 0, NULL, 3, NULL, NULL, 5, NULL, NULL, 0, 0)
GO
INSERT [dbo].[itemdescription] ([itm_descp_id], [itm_id], [itm_descp], [bid], [care], [features], [heel_height], [heel_type], [attached_sleeves], [Sleeve_Length], [occasion], [item_mid], [neck_type], [sleeves_material], [itm_wtid], [product_code], [model_no], [shipping_charges], [offer]) VALUES (7, 13, N'xcvcv', 2003, NULL, NULL, NULL, NULL, NULL, 0, NULL, 7, NULL, NULL, 4, NULL, NULL, 0, 0)
GO
INSERT [dbo].[itemdescription] ([itm_descp_id], [itm_id], [itm_descp], [bid], [care], [features], [heel_height], [heel_type], [attached_sleeves], [Sleeve_Length], [occasion], [item_mid], [neck_type], [sleeves_material], [itm_wtid], [product_code], [model_no], [shipping_charges], [offer]) VALUES (11, 8, N'pure cotton', 2002, N'water wash', N'', N'', N'', N'', 0, N'', 2, N'', N'', 2, N'', N'', 0, 0)
GO
INSERT [dbo].[itemdescription] ([itm_descp_id], [itm_id], [itm_descp], [bid], [care], [features], [heel_height], [heel_type], [attached_sleeves], [Sleeve_Length], [occasion], [item_mid], [neck_type], [sleeves_material], [itm_wtid], [product_code], [model_no], [shipping_charges], [offer]) VALUES (12, 17, N'lenion', 2006, N'water wash', N'waterproos', N'', N'', N'', 0, N'', 13, N'', N'', 7, N'', N'', 0, 0)
GO
SET IDENTITY_INSERT [dbo].[itemdescription] OFF
GO
SET IDENTITY_INSERT [dbo].[Itemesizes] ON 
GO
INSERT [dbo].[Itemesizes] ([itm_sz_id], [itm_id], [price], [quantity], [itm_length], [color], [itm_size]) VALUES (1, 8, 1500, 5, 45, N'green', N'M')
GO
INSERT [dbo].[Itemesizes] ([itm_sz_id], [itm_id], [price], [quantity], [itm_length], [color], [itm_size]) VALUES (2, 8, 2500, 10, 40, N'red', N'XL')
GO
INSERT [dbo].[Itemesizes] ([itm_sz_id], [itm_id], [price], [quantity], [itm_length], [color], [itm_size]) VALUES (3, 8, 2000, 10, 42, N'skyblue', N'L')
GO
INSERT [dbo].[Itemesizes] ([itm_sz_id], [itm_id], [price], [quantity], [itm_length], [color], [itm_size]) VALUES (4, 17, 2000, 10, 44, N'red', N'XL')
GO
INSERT [dbo].[Itemesizes] ([itm_sz_id], [itm_id], [price], [quantity], [itm_length], [color], [itm_size]) VALUES (5, 17, 1600, 15, 46, N'yellow', N'XS')
GO
SET IDENTITY_INSERT [dbo].[Itemesizes] OFF
GO
SET IDENTITY_INSERT [dbo].[Items] ON 
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (1, N'Women Pink Printed Straight Kurta', N'img1.jpg', 501, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (2, N'Indigo Flared Key Heol Kurta', N'img2.jpg', 501, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (3, N'Flared Embellished Kurta', N'img3.jpg', 501, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (4, N'Indigo Flared Key Heol Kurta', N'img4.jpg', 501, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (5, N'Women Pink Printed Straight Kurta', N'img5.jpg', 501, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (6, N'Pleated Neck Floral Blouson Top', N'img_top_cat1.jpg', 502, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (7, N'Black Georgette Assymmetric Top', N'img_top2_cat1.jpg', 502, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (8, N'Polka Dotted Blouson Pleated Top', N'img_top3_cat1.jpg', 502, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (9, N'Ruffle Sleeved Wrap Top', N'img_top4_cat1.jpg', 502, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (10, N'Multi Colored Poly Crepe Top', N'img_top5_cat1.jpg', 502, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (11, N'Levis', N'mJd9v7.jpg', 524, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (12, N'peterengland', N'02KePd.jpg', 510, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (13, N'uspolo', N'noDW9i.png', 510, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (14, N'pepe', N'wsUbS1.jpg', 511, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (15, N'wrongler', N'nsZ9i8.jpg', 524, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (16, N'Levis', N'ktUq5Z.png', 520, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (17, N'peterengland', N'PH5Woq.png', 521, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (18, N'bag', N'3zF9j0.jpg', 518, 10)
GO
INSERT [dbo].[Items] ([itm_id], [it_name], [cat_img], [prod_subcat_id], [vid]) VALUES (19, N'Levis', N'Qu7CVF.jpg', 510, 10)
GO
SET IDENTITY_INSERT [dbo].[Items] OFF
GO
SET IDENTITY_INSERT [dbo].[Items_Bag] ON 
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (340, 2, 7, N'M', 550, 3, N'ORD', 4)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (341, 2, 5, N'XS', 679, 5, N'ORD', 4)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (343, 2, 9, N'L', 450, 3, N'ORD', 5)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (344, 2, 6, N'XS', 500, 2, N'ORD', 5)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (345, 2, 6, N'XL', 2000, 4, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (346, 2, 7, N'XS', 1100, 3, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (347, 2, 4, N'XS', 990, 2, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (348, 2, 4, N'M', 990, 1, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (350, 2, 4, N'L', 990, 2, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (351, 42, 10, N'XS', 650, 3, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (352, 42, 1, N'XS', 1189, 2, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (353, 42, 5, N'XS', 679, 2, N'ORD', 6)
GO
INSERT [dbo].[Items_Bag] ([bag_id], [uid], [itm_id], [size], [price], [qunty], [status], [ord_id]) VALUES (354, 42, 3, N'XS', 1313, 4, N'ORD', 6)
GO
SET IDENTITY_INSERT [dbo].[Items_Bag] OFF
GO
SET IDENTITY_INSERT [dbo].[Items_Description] ON 
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (1, 1, N'Women Pink Printed Straight Kurta', N'Biba', 1189, N'Machine-wash', N'yes', N'Three-Quarter Sleeves', N'Daily', N'green', N'rayon', 1, N'not transparent', NULL, N'key hole', N'rayon', N'none', N'printed', 50, N'rayon', N'15034468', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (2, 2, N'Indigo Flared Key Heol Kurta', N'W', 1199, N'normal hand wash', N'yes', N'Three-Quarter Sleeves', N'casual wear', N'blue', N'rayon', 1, N'not transparent', NULL, N'round', N'rayon', N'none', N'printed', 45, N'rayon', N'15772315', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (3, 3, N'Flared Embellished Kurta', N'Biba', 1313, N'machhine wash', N'yes', N'Three-Quarter Sleeves', N'diwali', N'maroon', N'rayon', 1, N'not transparent', NULL, N'round', N'rayon', N' embellished', N'printed', 50, N'rayon', N'15473143', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (4, 6, N'Pleated Neck Floral Blouson Top', N'W', 500, N'hand-wash', N'yes', N'Three-Quarter Sleeves', N'Daily', N'pink', N'poly crepe', 1, N'not transparent', NULL, N'round', N'rayon', N' embellished', N'printed', 25, N'rayon', N'14876287', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (5, 7, N'Black Georgette Assymmetric Top', N'Sassafras', 550, N'hand-wash', N'yes', N'Three-Quarter Sleeves', N'Daily', N' black', N'georgette', 1, N'not transparent', NULL, N'round', N'georgette', N'none', N'printed', 25, N'georgette', N'10449461', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (6, 8, N'Polka Dotted Blouson Pleated Top', N'Biba', 600, N'machhine wash', N'yes', N'Three-Quarter Sleeves', N'casual wear', N'pink', N'georgette', 1, N'not transparent', NULL, N'round', N'georgette', N' embellished', N'printed', 25, N'georgette', N'14240827', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (7, 9, N'Ruffle Sleeved Wrap Top', N'Sassafras', 450, N'hand-wash', N'yes', N'Three-Quarter Sleeves', N'casual wear', N'multi', N'polyester', 1, N'not transparent', NULL, N'round', N'polyester', N' embellished', N'printed', 25, N'polyester', N'14778887', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (8, 10, N'Multi Colored Poly Crepe Top', N'Biba', 650, N'machhine wash', N'yes', N'Three-Quarter Sleeves', N'casual wear', N'multi', N'polyester', 1, N'not transparent', NULL, N'round', N'polyester', N' embellished', N'printed', 25, N'polyester', N'11217670', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (9, 4, N'Women Maroon & Golden Printed Anarkali Kurta', N'Jack&Jones', 990, N'machhine wash', N'yes', N'Three-Quarter Sleeves', N'Festive', N'Earthy', N'Cotton ', 1, N'not transparent', NULL, N'round', N'Cotton ', N' embellished', N'printed', 40, N'Cotton ', N'11217671', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Items_Description] ([itm_descp_id], [itm_id], [itm_descp], [brandname], [price], [care], [attached_sleeves], [Sleeve_Length], [occasion], [color], [material_type], [no_of_pcs], [transparency], [itm_style_type], [neck_type], [sleeves_material], [work], [prints_pattern], [itm_length], [fabric], [product_code], [blouse_length], [blouse_material], [pallu], [blouse_work], [blouse_attached], [sleeve_fabric], [waist_rise], [closure], [width], [toe_type], [heel_height], [heel_type], [outer_material], [strap_material], [warranty], [item_weight], [dial_diameter], [dial_shape], [dial_color], [strap_color], [features], [model_no], [shoe_pouch_included], [sole_material], [IS_active], [shipping_charges], [offer], [bid]) VALUES (10, 5, N'Women Green & Golden Printed Straight Kurta', N'Jack&Jones', 679, N'machhine wash', N'yes', N'Three-Quarter Sleeves', N'Festive', N'Green', N'Cotton ', 1, N'not transparent', NULL, N'round', N'Cotton ', N' embellished', N'printed', 40, N'Cotton ', N'11217672', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Items_Description] OFF
GO
SET IDENTITY_INSERT [dbo].[itm_img_catlogs] ON 
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (1, 1, N'img1_cat1.jpg,img1_cat2.jpg,img1_cat3.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (2, 2, N'img2_cat1.jpg,img2_cat2.jpg,img2_cat3.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (3, 3, N'img3_cat1.jpg,img3_cat2.jpg,img3_cat3.jpg,img3_cat4.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (4, 6, N'img_top_cat1.jpg,img_top_cat2.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (5, 7, N'img_top2_cat1.jpg,img_top2_cat2.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (6, 8, N'img_top3_cat1.jpg,img_top3_cat2.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (7, 9, N'img_top4_cat1.jpg,img_top4_cat2.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (8, 10, N'img_top5_cat1.jpg,img_top5_cat2.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (9, 4, N'img4_kurti_cat1.jpg,img4_kurti_cat2.jpg,img4_kurti_cat3.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (10, 5, N'img5_kurti_cat1.jpg,img5_kurti_cat2.jpg')
GO
INSERT [dbo].[itm_img_catlogs] ([itm_img_cat_id], [itm_id], [Images]) VALUES (19, 19, N'varaganback.jpg,varaganright.jpg,varagantop.jpg,varagnleft.jpg')
GO
SET IDENTITY_INSERT [dbo].[itm_img_catlogs] OFF
GO
SET IDENTITY_INSERT [dbo].[product_sizes] ON 
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (1, N'XS', 10)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (2, N'S', 10)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (3, N'M', 10)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (4, N'L', 10)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (5, N'XL', 10)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (6, N'XXL', 10)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (7, N'ONESIZE', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (8, N'36', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (9, N'37', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (10, N'38', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (11, N'39', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (12, N'40', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (13, N'41', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (14, N'3', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (15, N'4', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (16, N'5', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (17, N'6', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (18, N'7', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (19, N'8', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (20, N'28', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (21, N'30', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (22, N'32', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (23, N'34', NULL)
GO
INSERT [dbo].[product_sizes] ([itm_sz_id], [itm_size], [pd_cat_id]) VALUES (24, N'36', NULL)
GO
SET IDENTITY_INSERT [dbo].[product_sizes] OFF
GO
SET IDENTITY_INSERT [dbo].[Products_Category] ON 
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (10, N'Indian & Fusion Wear', 101, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (20, N'Womens Western Wear', 101, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (30, N'bags', 101, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (40, N'footware', 101, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (50, N'TopWare', 100, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (60, N'Bottomware', 100, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (70, N'indian and festive ware', 100, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (80, N'Accessories', 104, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (90, N'Beauty', 101, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (100, N'footware', 100, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (110, N'bags and backpacks', 100, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (120, N'Beauty', 100, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (130, N'bag(s)', 100, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (140, N'Toys', 102, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (150, N'chain', 105, 1)
GO
INSERT [dbo].[Products_Category] ([prod_cat_id], [pcName], [PID], [IsActive]) VALUES (160, N'Accessories', 105, 1)
GO
SET IDENTITY_INSERT [dbo].[Products_Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Products_Subcategory] ON 
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (501, N'Kurtas and Suits', 10, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (502, N'Kurtis and Tops', 10, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (503, N'Ethinic Dresses', 10, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (504, N'Skirts', 10, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (505, N'Sarees', 10, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (506, N'DressMaterial', 10, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (507, N'Duppatas and Shawls', 10, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (509, N'Dresses and Jumpsuits', 20, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (510, N'Tops and T-shirts', 20, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (511, N'Jeans', 20, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (512, N'Sweaters', 20, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (513, N'Flats', 40, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (514, N'Casual Shoes', 40, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (515, N'Heels', 40, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (516, N'Boots', 40, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (517, N'Sport Shoes', 40, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (518, N'Hand Bags', 30, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (519, N'Wallets', 30, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (520, N'T-Shirts', 50, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (521, N'Casual Shirts', 50, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (522, N'Formal Shirts', 50, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (523, N'Jacktes', 50, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (524, N'Jeans', 60, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (525, N'Kurtas', 70, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (526, N'Sherwanis', 70, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (527, N'Watches', 80, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (528, N'MakeUp', 90, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (529, N'SkinCare', 90, 1)
GO
INSERT [dbo].[Products_Subcategory] ([prod_subcat_id], [pscName], [prod_cat_id], [IsActive]) VALUES (530, N'Fragrances', 90, 1)
GO
SET IDENTITY_INSERT [dbo].[Products_Subcategory] OFF
GO
SET IDENTITY_INSERT [dbo].[Products_Types] ON 
GO
INSERT [dbo].[Products_Types] ([PID], [PName], [IsActive]) VALUES (100, N'Men', 1)
GO
INSERT [dbo].[Products_Types] ([PID], [PName], [IsActive]) VALUES (101, N'Women', 1)
GO
INSERT [dbo].[Products_Types] ([PID], [PName], [IsActive]) VALUES (102, N'Kids', 1)
GO
INSERT [dbo].[Products_Types] ([PID], [PName], [IsActive]) VALUES (103, N'Home & Living', 1)
GO
INSERT [dbo].[Products_Types] ([PID], [PName], [IsActive]) VALUES (104, N'Accessories', 1)
GO
INSERT [dbo].[Products_Types] ([PID], [PName], [IsActive]) VALUES (105, N'Jewellery', 1)
GO
SET IDENTITY_INSERT [dbo].[Products_Types] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 
GO
INSERT [dbo].[Role] ([RoleID], [RoleName]) VALUES (1, N'Admin')
GO
INSERT [dbo].[Role] ([RoleID], [RoleName]) VALUES (2, N'Vendor')
GO
INSERT [dbo].[Role] ([RoleID], [RoleName]) VALUES (3, N'User')
GO
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[tblEmployee] ON 
GO
INSERT [dbo].[tblEmployee] ([EmployeeId], [Name], [City], [Department], [Gender]) VALUES (1, N'swathi', N'vizag', N'IT', N'Female')
GO
INSERT [dbo].[tblEmployee] ([EmployeeId], [Name], [City], [Department], [Gender]) VALUES (3, N'Amulya', N'Bangalore', N'IT', N'Female')
GO
INSERT [dbo].[tblEmployee] ([EmployeeId], [Name], [City], [Department], [Gender]) VALUES (5, N'shanmukha', N'chennai', N'Non-IT', N'Male')
GO
INSERT [dbo].[tblEmployee] ([EmployeeId], [Name], [City], [Department], [Gender]) VALUES (6, N'Ramu', N'Skml', N'Non-IT', N'Male')
GO
INSERT [dbo].[tblEmployee] ([EmployeeId], [Name], [City], [Department], [Gender]) VALUES (7, N'raghu', N'vzg', N'it', N'Male')
GO
SET IDENTITY_INSERT [dbo].[tblEmployee] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (1, N'SMS', N'Admin', N'admin@SMSF.com', N'123456', N'1234567890', N'Female', 0, N'7v3Sys.jpg', 1)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (2, N'swathi', N'chinnala', N'swathi.chinnala@gmail.com', N'swathi1', N'9988776655', N'Female', 0, N'M1ydzk.jpg', 3)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (3, N'ramesh', N'k', N'malleswararaokaredla@gmail.com', N'123456', N'7894561230', N'Male', 0, N'c0R2Yr.jpg', 3)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (4, N'sita', N'k', N'radmaa@gmail.com', N'xxxxx', N'7784496612', N'male', 0, N'1g6y78.jpg', 3)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (5, N'swathi', N'jkjhk', N'swathiramayanam58@gmail.com', N'swathi', N'1111111111', N'Female', 0, N'9LM8oz.jpg', 1)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (9, N'sudha', N'Sankari', N'vendor@SMSF.com', N'123456', N'9876543210', N'Female', NULL, N'1g6y78.jpg', 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (10, N'ramesh', N'k', N'm@g.com', N'456123', N'7894561230', N'Male', NULL, N'9LM8oz.jpg', 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (11, N'test', N'test', N'testtest@smsf.com', N'234567', N'11111111', N'Female', NULL, N'', 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (12, N'vendor', N'vendor', N'vendor@smsf.com', N'2345678', N'11111111', N'male', NULL, N'', 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (14, N'test', N'vendor', N'testvendor@smsf.com', N'123456', N'9898989899', N'male', NULL, NULL, 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (15, N'malli', N'K', N'm@kg.com', N'^aeng1C*4N', N'9246924612', N'Male', NULL, NULL, 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (37, N'malleswararao', N'K', N'malleswararaok@smsf.com', N'^aeng1C*4M', N'9246924612', N'Male', NULL, NULL, 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (38, N'xxxx', N'test', N'm@gg.com', N'c^@Njzpyy(', N'2222222222', N'Male', NULL, NULL, 2)
GO
INSERT [dbo].[User] ([UID], [FirstName], [LastName], [Email], [Password], [PhoneNo], [Gender], [OTP], [Image], [RoleID]) VALUES (41, N'pallavi', N'sai', N'ps@yahooo.com', N'ps123456', N'7894561230', N' ', NULL, N'.png', 2)
GO
SET IDENTITY_INSERT [dbo].[User] OFF
GO
SET IDENTITY_INSERT [dbo].[Vendor] ON 
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (1, 10, N'.jpg', CAST(N'2018-12-10T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (2, 9, N'jpg', CAST(N'2018-12-10T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (3, 11, NULL, CAST(N'2018-12-31T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (5, 12, NULL, CAST(N'2018-12-31T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (6, 14, NULL, CAST(N'2018-12-31T00:00:00' AS SmallDateTime), 0)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (7, 15, NULL, CAST(N'2018-12-31T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (8, 37, NULL, CAST(N'2019-01-02T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (9, 38, NULL, CAST(N'2019-01-03T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor] ([ID], [VID], [Logo], [DOR], [IsActive]) VALUES (10, 41, NULL, CAST(N'2019-01-10T00:00:00' AS SmallDateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Vendor] OFF
GO
SET IDENTITY_INSERT [dbo].[Vendor_Products] ON 
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (1, 10, 502, N'ramesh_k', CAST(N'2019-03-01T00:00:00' AS SmallDateTime), NULL, NULL, 0)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (2, 10, 518, N'ramesh_k', CAST(N'2019-03-01T00:00:00' AS SmallDateTime), N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), 0)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (5, 10, 502, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), 0)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (6, 10, 518, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), 0)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (7, 10, 529, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), N'ramesh_k', CAST(N'2019-08-01T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (8, 10, 530, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), NULL, NULL, 0)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (9, 10, 513, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), N'ramesh_k', CAST(N'2019-08-01T00:00:00' AS SmallDateTime), 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (10, 10, 509, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), N'ramesh_k', CAST(N'2019-07-01T00:00:00' AS SmallDateTime), 0)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (11, 10, 527, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (12, 10, 524, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), N'ramesh_k', CAST(N'2019-07-01T00:00:00' AS SmallDateTime), 0)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (13, 10, 525, N'ramesh_k', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (14, 9, 520, N'sudha_Sankari', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (15, 9, 521, N'sudha_Sankari', CAST(N'2019-04-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (16, 10, 515, N'ramesh_k', CAST(N'2019-08-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (17, 10, 516, N'ramesh_k', CAST(N'2019-08-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (18, 9, 527, N'sudha_Sankari', CAST(N'2019-08-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (19, 10, 501, N'ramesh_k', CAST(N'2019-09-01T00:00:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (20, 10, 519, N'ramesh_k', CAST(N'2019-01-18T15:20:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (21, 10, 526, N'ramesh_k', CAST(N'2019-01-18T15:23:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (22, 10, 507, N'ramesh_k', CAST(N'2019-01-18T15:25:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (23, 10, 505, N'ramesh_k', CAST(N'2019-01-18T15:25:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (24, 10, 504, N'ramesh_k', CAST(N'2019-01-18T15:25:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (25, 10, 506, N'ramesh_k', CAST(N'2019-05-14T14:49:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (26, 10, 503, N'ramesh_k', CAST(N'2019-05-14T14:49:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (27, 10, 514, N'ramesh_k', CAST(N'2019-05-17T10:24:00' AS SmallDateTime), NULL, NULL, 1)
GO
INSERT [dbo].[Vendor_Products] ([Vpid], [Vid], [prod_subcat_id], [createdby], [createdon], [updatedby], [updatedon], [isactive]) VALUES (28, 10, 517, N'ramesh_k', CAST(N'2019-05-17T10:24:00' AS SmallDateTime), NULL, NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[Vendor_Products] OFF
GO
SET IDENTITY_INSERT [dbo].[WhishList] ON 
GO
INSERT [dbo].[WhishList] ([wh_id], [uid], [itm_id]) VALUES (7, 2, 5)
GO
SET IDENTITY_INSERT [dbo].[WhishList] OFF
GO
ALTER TABLE [dbo].[ErrorLog] ADD  CONSTRAINT [df_logs_loggedondate]  DEFAULT (getdate()) FOR [LoggedOnDate]
GO
ALTER TABLE [dbo].[Item_Orders]  WITH CHECK ADD FOREIGN KEY([Address])
REFERENCES [dbo].[Address] ([AID])
GO
ALTER TABLE [dbo].[itemdescription]  WITH CHECK ADD  CONSTRAINT [FK_itemdescription_Brands] FOREIGN KEY([item_mid])
REFERENCES [dbo].[item_material] ([item_mid])
GO
ALTER TABLE [dbo].[itemdescription] CHECK CONSTRAINT [FK_itemdescription_Brands]
GO
ALTER TABLE [dbo].[itemdescription]  WITH CHECK ADD  CONSTRAINT [FK_itemdescription_item_material] FOREIGN KEY([item_mid])
REFERENCES [dbo].[item_material] ([item_mid])
GO
ALTER TABLE [dbo].[itemdescription] CHECK CONSTRAINT [FK_itemdescription_item_material]
GO
ALTER TABLE [dbo].[itemdescription]  WITH CHECK ADD  CONSTRAINT [FK_itemdescription_item_worktype] FOREIGN KEY([itm_wtid])
REFERENCES [dbo].[item_worktype] ([itm_wtid])
GO
ALTER TABLE [dbo].[itemdescription] CHECK CONSTRAINT [FK_itemdescription_item_worktype]
GO
ALTER TABLE [dbo].[itemdescription]  WITH CHECK ADD  CONSTRAINT [FK_itemdescription_Items] FOREIGN KEY([itm_id])
REFERENCES [dbo].[Items] ([itm_id])
GO
ALTER TABLE [dbo].[itemdescription] CHECK CONSTRAINT [FK_itemdescription_Items]
GO
ALTER TABLE [dbo].[Itemesizes]  WITH CHECK ADD  CONSTRAINT [FK_Itemesizes_Items] FOREIGN KEY([itm_id])
REFERENCES [dbo].[Items] ([itm_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Itemesizes] CHECK CONSTRAINT [FK_Itemesizes_Items]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK__Items__prod_subc__245D67DE] FOREIGN KEY([prod_subcat_id])
REFERENCES [dbo].[Products_Subcategory] ([prod_subcat_id])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK__Items__prod_subc__245D67DE]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Items_vid] FOREIGN KEY([vid])
REFERENCES [dbo].[User] ([UID])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Items_vid]
GO
ALTER TABLE [dbo].[Items_Bag]  WITH CHECK ADD  CONSTRAINT [FK__Items_Bag__itm_i__37703C52] FOREIGN KEY([ord_id])
REFERENCES [dbo].[Item_Orders] ([ord_id])
GO
ALTER TABLE [dbo].[Items_Bag] CHECK CONSTRAINT [FK__Items_Bag__itm_i__37703C52]
GO
ALTER TABLE [dbo].[Items_Description]  WITH CHECK ADD  CONSTRAINT [FK__Items_Des__itm_i__2DE6D218] FOREIGN KEY([bid])
REFERENCES [dbo].[Brands] ([bid])
GO
ALTER TABLE [dbo].[Items_Description] CHECK CONSTRAINT [FK__Items_Des__itm_i__2DE6D218]
GO
ALTER TABLE [dbo].[itm_img_catlogs]  WITH CHECK ADD  CONSTRAINT [FK__itm_img_c__itm_i__30C33EC3] FOREIGN KEY([itm_id])
REFERENCES [dbo].[Items] ([itm_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[itm_img_catlogs] CHECK CONSTRAINT [FK__itm_img_c__itm_i__30C33EC3]
GO
ALTER TABLE [dbo].[itmcolor]  WITH CHECK ADD  CONSTRAINT [FK_itmcolor_Items] FOREIGN KEY([itm_id])
REFERENCES [dbo].[Items] ([itm_id])
GO
ALTER TABLE [dbo].[itmcolor] CHECK CONSTRAINT [FK_itmcolor_Items]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([aid])
REFERENCES [dbo].[Address] ([AID])
GO
ALTER TABLE [dbo].[product_sizes]  WITH CHECK ADD  CONSTRAINT [FK_product_sizes_Products_Category] FOREIGN KEY([pd_cat_id])
REFERENCES [dbo].[Products_Category] ([prod_cat_id])
GO
ALTER TABLE [dbo].[product_sizes] CHECK CONSTRAINT [FK_product_sizes_Products_Category]
GO
ALTER TABLE [dbo].[Products_Category]  WITH CHECK ADD  CONSTRAINT [FK__Products___prod___1BC821DD] FOREIGN KEY([PID])
REFERENCES [dbo].[Products_Types] ([PID])
GO
ALTER TABLE [dbo].[Products_Category] CHECK CONSTRAINT [FK__Products___prod___1BC821DD]
GO
ALTER TABLE [dbo].[Products_Subcategory]  WITH CHECK ADD  CONSTRAINT [FK__Products___prod___2180FB33] FOREIGN KEY([prod_cat_id])
REFERENCES [dbo].[Products_Category] ([prod_cat_id])
GO
ALTER TABLE [dbo].[Products_Subcategory] CHECK CONSTRAINT [FK__Products___prod___2180FB33]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO
ALTER TABLE [dbo].[Vendor_Products]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_Products_Vendor_Products] FOREIGN KEY([Vid])
REFERENCES [dbo].[User] ([UID])
GO
ALTER TABLE [dbo].[Vendor_Products] CHECK CONSTRAINT [FK_Vendor_Products_Vendor_Products]
GO
ALTER TABLE [dbo].[WhishList]  WITH CHECK ADD  CONSTRAINT [FK__WhishList__itm_i__40F9A68C] FOREIGN KEY([itm_id])
REFERENCES [dbo].[Items] ([itm_id])
GO
ALTER TABLE [dbo].[WhishList] CHECK CONSTRAINT [FK__WhishList__itm_i__40F9A68C]
GO
/****** Object:  StoredProcedure [dbo].[Addaddress]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Addaddress](@UID int,@Address varchar(500),@Town varchar(100),@City varchar(100),@Pincode int,@State varchar(100),@Type varchar(50),@avaldays varchar(100),@Time varchar(50))
as

BEGIN

insert into Address(UID,Address,Town,City,Pincode,State,Type,avaldays,Time) values(@UID,@Address,@Town,@City,@Pincode,@State,@Type,@avaldays,@Time);
END;
GO
/****** Object:  StoredProcedure [dbo].[AddingListOfAddress]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[AddingListOfAddress](@List dbo.AddreddList readonly)  
AS
begin  
   insert into Address select [UID],[Address],[Town] ,[City],[Pincode],[State],[Type],[avaldays],[Time] from @List  
end  
GO
/****** Object:  StoredProcedure [dbo].[AdditemsToBag]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[AdditemsToBag](@uid int,@itm_id int,@size varchar(50),@price int,@qunty int,@status varchar(50))
as
begin

 if EXISTS (select * from Items_Bag where itm_id=@itm_id and size=@size and uid=@uid and status='INB')
   begin
   update Items_Bag set qunty=qunty+1 where itm_id=@itm_id and size=@size and uid=@uid and status='INB';
   end
 else
     begin

         insert into Items_Bag(uid,itm_id,size,price,qunty,status) values(@uid,@itm_id,@size,@price,@qunty,@status);
     end
end;
GO
/****** Object:  StoredProcedure [dbo].[AddOrders]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[AddOrders](@uid int,@aid int,@phone varchar(10),@amount int,@shippingchrgs int,@totalamount int,@paymentmode varchar(150),@cardno varchar(15),@cardname varchar(100),@expmonth int,@expyear int,@cvv int,@itm_id varchar(max),@ord_date date,@ord_status varchar(100),@expe_dvy_date date,@actl_dvy date,@bagstaus varchar(100))
as

declare @ord_id int

begin
insert into Item_Orders (uid,itm_id,ord_date,ord_status,payment_mode,expe_dvy_date,actl_dvy,Address,phone,amount,shipping_charges,Total_amount,cardno,cardname,expmonth,expyear,cvv) 
values(@uid,@itm_id,@ord_date,@ord_status,@paymentmode,@expe_dvy_date,@actl_dvy,@aid,@phone,@amount,@shippingchrgs,@totalamount,@cardno,@cardname,@expmonth,@expyear,@cvv);

select @ord_id=max(ord_id) from Item_Orders;

update Items_Bag set status=@bagstaus,ord_id=@ord_id where status='INB';

end;
GO
/****** Object:  StoredProcedure [dbo].[CheckuserDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[CheckuserDetails](@username varchar(100),@password varchar(100),@result varchar(50) OUTPUT)
as
if exists(select * from [dbo].[User] where Email=@username and Password=@password)
 begin
 set @result= 'valid';
  end

  else if exists(select * from [dbo].[User] where Email=@username and Password !=@password)
  
  begin
  set @result=  'invalid Password';
  end


  else if exists(select * from [dbo].[User] where Email !=@username and Password=@password)

  begin
  set @result=  'invalid Email';
  end
  else
  begin
  set @result=  'invalid username and password';
  end
GO
/****** Object:  StoredProcedure [dbo].[DeleteAddress]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DeleteAddress](@AID int,@UID int)
as 
begin
delete from Address where AID=@AID and UID=@UID;
end;
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserByUid]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--swathi
create procedure [dbo].[DeleteUserByUid](@uid int)
as 
begin
delete from [dbo].[User] where UID=@uid;
end;
GO
/****** Object:  StoredProcedure [dbo].[FilterItems]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[FilterItems](@bname varchar(100),@minprice int,@maxprice int,@type int,@prod_subcat_id int,@name varchar(100))
as
begin

if(@prod_subcat_id=0)
begin

if(@type=1)
begin

--select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id,Brands.bid,Products_Subcategory.pscname from Items,Products_Subcategory,Items_Description,Brands,Products_Types,Products_Category where Products_Types.PID=Products_Category.PID and Products_Category.prod_cat_id=Products_Subcategory.prod_cat_id and Items.prod_subcat_id=Products_Subcategory.prod_subcat_id and Items.itm_id=Items_Description.itm_id and Brands.Bname=Items_Description.brandname and (Products_Subcategory.pscname LIKE '%'+@name+'%' or Products_Subcategory.pscname=@bname or Items_Description.brandname=@bname) and (Items_Description.brandname=@bname or Items_Description.brandname=@name or Products_Types.PName=@name);

--select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id,Brands.bid,Products_Subcategory.pscname from Items,Products_Subcategory,Items_Description,Brands,Products_Types,Products_Category where Products_Types.PID=Products_Category.PID and Products_Category.prod_cat_id=Products_Subcategory.prod_cat_id and Items.prod_subcat_id=Products_Subcategory.prod_subcat_id and Items.itm_id=Items_Description.itm_id and Brands.Bname=Items_Description.brandname and  (Items_Description.brandname=@bname and Products_Subcategory.pscname LIKE '%'+@name+'%') or (Products_Subcategory.pscName=@bname and Items_Description.brandname=@name) or(Items_Description.brandname=@bname and Products_Types.PName=@name) or(Products_Subcategory.pscName=@bname and Products_Types.PName=@name);


select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id,Brands.bid,
Products_Subcategory.pscname 
from Items inner join Products_Subcategory on Items.prod_subcat_id=Products_Subcategory.prod_subcat_id inner join Items_Description  on Items.itm_id=Items_Description.itm_id 
inner join Brands on Items_Description.brandname=Brands.Bname inner join Products_Category on Products_Subcategory.prod_cat_id=Products_Category.prod_cat_id 
inner join Products_Types on Products_Types.PID=Products_Category.PID 
where (Brands.Bname=@bname or Products_Subcategory.pscName=@bname) and (Products_Subcategory.pscName LIKE '%'+@name+'%' or Products_Types.PName LIKE '%'+@name+'%' or Brands.Bname=@name);

--select * from Items;
end

else if(@type=2)
begin
select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id,Brands.bid,Products_Subcategory.pscname from Items,Products_Subcategory,Items_Description,Brands,Products_Types,Products_Category where Products_Types.PID=Products_Category.PID and Products_Category.prod_cat_id=Products_Subcategory.prod_cat_id and Items.prod_subcat_id=Products_Subcategory.prod_subcat_id and Items.itm_id=Items_Description.itm_id and Brands.Bname=Items_Description.brandname and(Products_Subcategory.pscname LIKE '%'+@name+'%' or Items_Description.brandname=@name or Products_Types.PName=@name) and Items_Description.price>=@minprice and Items_Description.price<=@maxprice;
end

end


else
begin

if(@type=1)
begin
select * from Items_Description idc,Items itm where idc.brandname=@bname and itm.prod_subcat_id=@prod_subcat_id and itm.itm_id=idc.itm_id;
end
else if(@type=2)
begin
select * from Items_Description idc,Items itm where itm.prod_subcat_id=@prod_subcat_id and idc.price>=@minprice and idc.price<=@maxprice and itm.itm_id=idc.itm_id;

end;

else if(@type=3)
begin
select * from Items_Description idc,Items itm where itm.prod_subcat_id=@prod_subcat_id and idc.price>=@minprice and idc.price<=@maxprice and idc.brandname=@bname and itm.itm_id=idc.itm_id;

end
end;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetAddressDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAddressDetails](@UID int)
as
begin
select * from Address where UID=@UID;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetAllBrandsData]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create procedure [dbo].[GetAllBrandsData]
as
begin
select * from Brands;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetAllOrderDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE  [dbo].[GetAllOrderDetails]               
AS                  
BEGIN       
 SELECT DISTINCT u.Firstname + ' ' + u.LastName as UserName,
 u.Email,
 u.PhoneNo,
 u.UID,
 itmord.ord_id,
 itmord.ord_date,
 itmord.amount,
 itmord.ord_status,
 itmord.expe_dvy_date,
 itmord.actl_dvy,

 	PaymentMode = CASE	WHEN itmord.payment_mode = 'COD' THEN 'Cash On Deliver' 
									WHEN itmord.payment_mode = 'NB' THEN 'Net Banking'
									
								ELSE 'Undefined'
							  END,

 LEN(itmord.itm_id) - LEN(REPLACE(itmord.itm_id, ',', '')) as No_Of_Items_ordered,
     
 (SELECT  s.Firstname + ' ' + s.LastName FROM [dbo].[User] s WHERE s.UID in(i.vid))as VendorName
  FROM [dbo].[User] u       
 INNER JOIN      
  [dbo].[Item_Orders] itmord ON u.uid=itmord.uid      
 INNER JOIN      
  [dbo].[Items_Bag] itmb ON itmb.ord_id=itmord.ord_id       
 INNER JOIN      
  Items i on i.itm_id IN ( select Item from dbo.SplitString(itmord.itm_id,','))      
    
 END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllProducts_Categories]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetAllProducts_Categories]
as
begin
select * from Products_Category;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetAllProductsDataWithCategory]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[GetAllProductsDataWithCategory]
as
begin
select pt.PID,pt.PName,pc.prod_cat_id,pc.pcName,psc.prod_subcat_id,psc.pscname from Products_Types pt,Products_Category pc,Products_Subcategory psc where pt.PID=pc.PID and pc.prod_cat_id=psc.prod_cat_id;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetAllSubCatgProductDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAllSubCatgProductDetails](@pid int)
as
begin
select pt.PID,pt.PName,pc.pcName,pc.prod_cat_id,psc.prod_subcat_id,pscname from Products_Category pc,Products_Types pt,Products_Subcategory psc where pt.PID=@pid and pc.PID=pt.PID and pc.prod_cat_id=psc.prod_cat_id;

end;
GO
/****** Object:  StoredProcedure [dbo].[GetItemDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetItemDetails](@itm_id int)
as
begin

select idc.itm_id,idc.itm_descp_id,idc.itm_descp,idc.brandname,idc.price,idc.care,idc.attached_sleeves,idc.Sleeve_Length,idc.occasion,idc.color,idc.material_type,idc.no_of_pcs,idc.transparency,idc.neck_type,idc.sleeves_material,idc.work,idc.prints_pattern,idc.itm_length,idc.fabric,idc.product_code,idc.blouse_length,idc.blouse_material,idc.pallu,idc.blouse_work,idc.blouse_attached,idc.sleeve_fabric,idc.waist_rise,idc.closure,idc.width,idc.toe_type,idc.heel_height,idc.heel_type,idc.outer_material,idc.strap_material,idc.warranty,idc.item_weight,idc.dial_diameter,idc.dial_shape,idc.dial_color,idc.strap_color,idc.features,idc.model_no,idc.shoe_pouch_included,idc.sole_material,idc.IS_active,imc.itm_img_cat_id,imc.Images,Items.cat_img,Items.it_name from Items_Description idc,itm_img_catlogs imc,Items 
where Items.itm_id=idc.itm_id and Items.itm_id=imc.itm_id and Items.itm_id=@itm_id; 



select itm_sz_id,itm_size,quantity,cost  from Itemesizes where itm_id=@itm_id;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetItemsBasedsearch]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[GetItemsBasedsearch](@name varchar(100))
as
begin

select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id,Brands.bid,Products_Subcategory.pscname from Items,Products_Subcategory,Items_Description,Brands,Products_Types,Products_Category where Items.prod_subcat_id=Products_Subcategory.prod_subcat_id and Items.itm_id=Items_Description.itm_id and Brands.Bname=Items_Description.brandname and Products_Types.PID=Products_Category.PID and Products_Category.prod_cat_id=Products_Subcategory.prod_cat_id and (Products_Subcategory.pscname LIKE '%'+@name+'%' or Items_Description.brandname=@name or Products_Types.PName=@name);

end;
GO
/****** Object:  StoredProcedure [dbo].[GetItemsByPassing_IDS]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetItemsByPassing_IDS](@proids product_subcat_ids_list_tbltype READONLY)
as
begin
  select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id from Items,Items_Description where Items.prod_subcat_id IN (SELECT n FROM @proids) and Items.itm_id=Items_Description.itm_id;
   end;
GO
/****** Object:  StoredProcedure [dbo].[GetItemSizeData]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetItemSizeData](@itm_id int)
as
begin
select itm_sz_id,itm_size,qunty,cost  from Itemesizes where itm_id=@itm_id;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetKurtasData]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetKurtasData](@prod_subcat_id int)
as
begin
select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id,Brands.bid from Items,Items_Description,Brands where Items.prod_subcat_id=@prod_subcat_id and Items.itm_id=Items_Description.itm_id and Brands.Bname=Items_Description.brandname;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetOrdersdatabyuid]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetOrdersdatabyuid](@uid int)
as
begin
 DECLARE @aid int,@pGroupIDs varchar(50)

select itmo.ord_id,itmo.ord_date,itmo.ord_status,itmo.expe_dvy_date,itmo.actl_dvy,itmo.[Address],itmo.phone,itmo.Total_amount,itmo.itm_id,adr.AID,adr.Address,adr.City,adr.State,adr.Town,adr.Pincode,adr.avaldays,adr.Type,adr.Time from Item_Orders itmo,Address adr where itmo.uid=@uid and itmo.Address=adr.AID;

 --SELECT itm.itm_id,itm.it_name,itm.cat_img,itmo.ord_id,idc.brandname,idc.price FROM Items itm,Item_Orders itmo,Items_Description idc Where (',' + itmo.itm_id +',' LIKE '%,' + CONVERT(VARCHAR, itm.itm_id) + ',%') and itm.itm_id=idc.itm_id;

 select ibag.itm_id,itm.it_name,itm.cat_img,ibag.ord_id,idc.brandname,ibag.price,ibag.qunty,ibag.size from Items_Bag ibag,Items_Description idc,Items itm where status='ORD' and ibag.itm_id=idc.itm_id and itm.itm_id=idc.itm_id;

end
GO
/****** Object:  StoredProcedure [dbo].[GetProductsDataByBrands]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetProductsDataByBrands](@Bname varchar(100))
as
begin
select Items.itm_id,Items.cat_img,Items.it_name,Items_Description.price,Items_Description.brandname,Items.prod_subcat_id,Brands.bid,Brands.bid,Products_Subcategory.pscname from Items,Items_Description,Brands,Products_Subcategory,Products_Types,Products_Category where Items_Description.brandname=@Bname and Items.itm_id=Items_Description.itm_id and Brands.Bname=Items_Description.brandname and Items.prod_subcat_id=Products_Subcategory.prod_subcat_id and  Products_Types.PID=Products_Category.PID and Products_Category.prod_cat_id=Products_Subcategory.prod_cat_id;
end;
GO
/****** Object:  StoredProcedure [dbo].[GetUserBagDetials]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetUserBagDetials](@uid int)
as
begin
select b.bag_id,b.itm_id,iob.price,b.qunty,b.size,b.uid,i.cat_img,i.it_name,iob.price as priceforsingle from Items_Bag b,Items i,Items_Description iob where b.uid=@uid and b.itm_id=i.itm_id and b.status='INB' and iob.itm_id=i.itm_id;
end;
GO
/****** Object:  StoredProcedure [dbo].[getvendors]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[getvendors]
AS
begin  
   select UID,FirstName,LastName from [User] where RoleID=2
end  
GO
/****** Object:  StoredProcedure [dbo].[GetWhishListData]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetWhishListData](@uid int)
as
begin
select w.uid,w.itm_id,w.wh_id,i.cat_img,i.it_name,idc.price from WhishList w,Items i,Items_Description idc where w.uid=@uid and w.itm_id=i.itm_id and w.itm_id=idc.itm_id;
end;
GO
/****** Object:  StoredProcedure [dbo].[LoginDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  mallesh  
-- Create date: 2-11-2019
-- =============================================  
--exec [LoginDetails] 'admin@SMSF.com','123456'
CREATE PROCEDURE [dbo].[LoginDetails](@Email varchar(50),@Password varchar(10))  
AS  
BEGIN   
 
   -- select UID,FirstName+''+LastName as name,Email,RoleID,PhoneNo from [dbo].[User] where Email=@Email and Password=@Password
	--select * from [dbo].[User] where Email=@Email and Password=@Password
	Declare @Result varchar(100)
	if exists(select Email from [User]  where Email=@Email and Password=@Password)
	begin
	set @Result='Email and password exists'
	select @result as result
	end

	else if exists(select Email from [User]  where Email=@Email) AND NOT EXISTS(select Password from [User]  where Password=@Password)
	begin
	set @Result='password does not exists'
	select @Result as result
	end

	else if exists(select Password from [User]  where Password=@Password)AND NOT EXISTS(select Email from [User]  where Email=@Email)
	begin
	set @Result='email does not exists'
	select @Result as result
	end

	else if not exists(select Password from [User]  where Password=@Password and Email=@Email)
	begin
	set @Result='Email and password both are not exists'
	select @Result as result
	end


END 

--select Password,Email from [User] where Password='123456' 
GO
/****** Object:  StoredProcedure [dbo].[MoveToWishLost_AND_RemovefromBag]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[MoveToWishLost_AND_RemovefromBag](@uid int,@itm_id int,@bag_id int,@type int)
as
begin
if(@type=1)
begin
insert into WhishList(uid,itm_id) values(@uid,@itm_id);
delete from Items_Bag where bag_id=@bag_id;
end
else if(@type=2)
begin
delete from Items_Bag where bag_id=@bag_id;
end;

else if(@type=3)
begin
insert into WhishList(uid,itm_id) values(@uid,@itm_id);
end;
end;
GO
/****** Object:  StoredProcedure [dbo].[RemoveItemfromWhishList]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[RemoveItemfromWhishList](@wh_id int)
as
begin
delete from WhishList where wh_id=@wh_id;
end;
GO
/****** Object:  StoredProcedure [dbo].[sp_category]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 -- =============================================  
-- Author:  <Author,k.malleswararao>  
-- Create date: <Create Date,12/11/18,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE  [dbo].[sp_category]  
AS  
BEGIN  
 select prod_subcat_id,pscName,prod_cat_id from Products_Subcategory where IsActive=1
END  
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllUserDetailsByID]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 28-11-2018  
-- Description: Get Details  By ID 
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetAllUserDetailsByID] (
@UID int
)	
AS  
BEGIN
   SELECT * FROM [dbo].[User] WHERE UID = @UID
		
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getitembrand]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<k.malleswararao,,Name>
-- Create date: <1/22/2019>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getitembrand]

AS
BEGIN

	SELECT  bid,Bname from Brands
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getitemmaterial]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<k.malleswararao,,Name>
-- Create date: <1/22/2019>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getitemmaterial]

AS
BEGIN

	SELECT *from item_material
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getitemnames]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<k.malleswararao,,Name>
-- Create date: <1/23/2019>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getitemnames]
@vid int,@prod_subcat_id int
AS
BEGIN

	SELECT it_name,itm_id from Items where vid=@vid and prod_subcat_id=@prod_subcat_id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getitemsizes]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<k.malleswararao,,Name>
-- Create date: <1/22/2019>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getitemsizes]

AS
BEGIN

	SELECT itm_sz_id,itm_size from product_sizes
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getitemworktype]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<k.malleswararao,,Name>
-- Create date: <1/22/2019>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getitemworktype]

AS
BEGIN

	SELECT *from item_worktype
END
GO
/****** Object:  StoredProcedure [dbo].[sp_getvendoritemdesclist]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_getvendoritemdesclist](@vid int)  
AS
begin  
				 select distinct

				  i.itm_id,s.it_name,
				  i.itm_descp,i.bid,
				  b.Bname,e.price,
				  e.color,i.item_mid,
				  m.material_type,
				  e.quantity,i.shipping_charges,
				  i.offer,e.itm_size 
				  
				  from itemdescription i
                  inner join Brands b on b.bid=i.bid 
			   	  inner join Items s on s.itm_id=i.itm_id 
				  inner join item_material m on m.item_mid=i.item_mid
				  inner join Itemesizes e on e.itm_id=i.itm_id
				  where s.vid=@vid
end  



GO
/****** Object:  StoredProcedure [dbo].[sp_getvendorwiseitems]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<k.malleswararao,,Name>
-- Create date: <1/22/2019>
-- =============================================
create PROCEDURE [dbo].[sp_getvendorwiseitems]
(@vid int)
AS
BEGIN

	SELECT it_name,itm_id from Items where vid=@vid
END
GO
/****** Object:  StoredProcedure [dbo].[sp_itemsadding]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_itemsadding](@vid int,@pscid int,@img varchar(8000),@it_name varchar(100),@imgnames varchar(100),@id int output)  
--exec [sp_vendoritems] 10,'529,530',5
AS
begin  
  
 --  if not exists (select itm_id from Items where it_name=@it_name)
    
	begin
    --insert into Vendor_Products(vid,createdon,createdby,prod_subcat_id)(SELECT @vid,CONVERT(varchar(10),GETDATE(),105),(select FirstName+'_'+LastName as name from [User] where UID=@vid),Item FROM dbo.SplitString(@prod_subcat_id, ','))
    
	insert into Items(vid,prod_subcat_id,it_name,cat_img)values(@vid,@pscid,@it_name,@img)
	  SET @id=SCOPE_IDENTITY()   
	 -- return @id
	 insert into itm_img_catlogs(itm_id,Images)values(@id,@imgnames)
	 end
	 
	
end  



--insert into Vendor_Products(vid,prod_subcat_id)(SELECT 10,Item FROM dbo.SplitString('Apple,Mango,Banana,Guava', ','))
GO
/****** Object:  StoredProcedure [dbo].[sp_Products_Category]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 -- =============================================  
-- Author:  <Author,k.malleswararao>  
-- Create date: <Create Date,12/11/18,>  
-- Description: <Description,,>  
-- =============================================  
--EXEC sp_Products_Category 100
CREATE PROCEDURE  [dbo].[sp_Products_Category](@pid int)  
AS  
BEGIN  
 select prod_cat_id,pcName,c.PID from Products_Category c inner join Products_Types t on c.PID=t.PID  
 where c.PID=@pid  AND t.IsActive=1
END  

GO
/****** Object:  StoredProcedure [dbo].[sp_Products_Subcategory]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,k.malleswararao>
-- Create date: <Create Date,12/11/18,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[sp_Products_Subcategory](@prod_cat_id int)
AS
BEGIN
	select distinct c.prod_cat_id,s.prod_subcat_id,s.pscname from Products_Subcategory s inner join Products_Category c  on c.prod_cat_id=s.prod_cat_id
	--inner join  Vendor_Products v on v.prod_subcat_id<>s.prod_subcat_id
	where c.prod_cat_id=@prod_cat_id and s.IsActive=1 --and  s.prod_subcat_id not in(select prod_subcat_id from Vendor_Products where Vid=@vid) 
END


GO
/****** Object:  StoredProcedure [dbo].[Sp_Products_Subcategorybyvid]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,k.malleswararao>
-- Create date: <Create Date,12/11/18,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[Sp_Products_Subcategorybyvid](@prod_cat_id int,@vid int)
AS
BEGIN
	select distinct c.prod_cat_id,s.prod_subcat_id,s.pscname from Products_Subcategory s inner join Products_Category c  on c.prod_cat_id=s.prod_cat_id
	--inner join  Vendor_Products v on v.prod_subcat_id<>s.prod_subcat_id
	where c.prod_cat_id=@prod_cat_id and s.IsActive=1 and  s.prod_subcat_id not in(select prod_subcat_id from Vendor_Products where Vid=@vid) 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_producttypes]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================    
-- Author:  <Author,,Name>    
-- Create date: <Create Date,,>    
-- Description: <Description,,>    
-- =============================================    
CREATE PROCEDURE  [dbo].[sp_producttypes]    
AS    
BEGIN    
 select PID,Pname from Products_Types where IsActive=1   --ORDER BY PName  ASC 
END 
GO
/****** Object:  StoredProcedure [dbo].[sp_producttypes_id]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================    
-- Author:  <Author,,Name>    
-- Create date: <Create Date,,>    
-- Description: <Description,,>    
-- =============================================    
create PROCEDURE  [dbo].[sp_producttypes_id] (@pid int)   
AS    
BEGIN    
 select PID,Pname from Products_Types where IsActive=1 and PID=@pid  --ORDER BY PName  ASC 
END 
GO
/****** Object:  StoredProcedure [dbo].[sp_vendoritemdesclist]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_vendoritemdesclist](
					@List dbo.itms_sizes readonly,
					@itm_id int,@bid int,
					@care varchar(100),@features varchar(100),
					@heel_height varchar(100),@heel_type varchar(100),
					@attached_sleeves varchar(100),@Sleeve_Length int,
					@occasion varchar(100),@item_mid int,
					@neck_type varchar(100),@sleeves_material varchar(100),
					@itm_wtid int,@product_code varchar(100),
					@model_no varchar(100),@shipping_charges int,
					@offer int,@itm_descp varchar(100)
)  
AS
begin  
					
					insert into itemdescription(
					itm_id,bid,
					care,features,
					heel_height,heel_type,
					attached_sleeves,Sleeve_Length,
					occasion,item_mid,
					neck_type,sleeves_material,
					itm_wtid,product_code,
					model_no,shipping_charges,
					offer,itm_descp
					)
					values(
					@itm_id,@bid,
					@care,@features,
					@heel_height,@heel_type,
					@attached_sleeves,@Sleeve_Length,
					@occasion,@item_mid,
					@neck_type,@sleeves_material,
					@itm_wtid,@product_code,
					@model_no,@shipping_charges,
					@offer,@itm_descp
					)

					insert into Itemesizes
					(
					itm_id,price,
					quantity,itm_length,
					color,itm_size
						
					)
   
					select 
				    itm_id,price,
					quantity,itm_length,
					color,itm_size
													
					from @List  

end  

GO
/****** Object:  StoredProcedure [dbo].[sp_vendoritemdetials]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_vendoritemdetials](@vid int)  
AS
begin  
  select  v.Vpid, u.FirstName+'_'+u.LastName as name,U.RoleID,v.isactive,u.UID,u.Email,u.Image,v.Vid,s.prod_subcat_id,s.pscname,c.pcName,c.prod_cat_id,p.PID,p.PName from Vendor_Products v inner join Products_Subcategory s on s.prod_subcat_id=v.prod_subcat_id
inner join  Products_Category c on c.prod_cat_id=s.prod_cat_id inner join Products_Types p on p.PID=c.PID
inner join [User] u on u.UID=v.Vid where  v.Vid=@vid and v.isactive=1
end  


--insert into Vendor_Products(vid,prod_subcat_id)(SELECT 10,Item FROM dbo.SplitString('Apple,Mango,Banana,Guava', ','))




GO
/****** Object:  StoredProcedure [dbo].[sp_vendoritemlist]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_vendoritemlist](@List dbo.vendorlist readonly)  
AS
begin  
   insert into Vendor_Products select vid,prod_subcat_id from @List  
end  
GO
/****** Object:  StoredProcedure [dbo].[sp_vendoritems]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_vendoritems](@vid int,@prod_subcat_id varchar(8000))  
--exec [sp_vendoritems] 10,'519'
AS
begin  
   --insert into Vendor_Products(vid,prod_subcat_id)values(@vid,@prod_subcat_id) 
   declare @count int
   set @count=(select COUNT(Vpid) from Vendor_Products where Vid=@vid and prod_subcat_id in(select Item FROM dbo.SplitString(@prod_subcat_id, ',')))
   print @count
   if (@count=0)
    
	begin
    --insert into Vendor_Products(vid,createdon,createdby,prod_subcat_id)(SELECT @vid,CONVERT(varchar(10),GETDATE(),105),(select FirstName+'_'+LastName as name from [User] where UID=@vid),Item FROM dbo.SplitString(@prod_subcat_id, ','))
    
	insert into Vendor_Products(vid,createdon,createdby,isactive,prod_subcat_id)(select @vid,CONVERT(smalldatetime,GETDATE(),105),(select distinct FirstName+'_'+LastName as name from [User] where UID=@vid),1,
	Item FROM dbo.SplitString( @prod_subcat_id, ','))

	 end
	 
	
end  



--insert into Vendor_Products(vid,prod_subcat_id)(SELECT 10,Item FROM dbo.SplitString('Apple,Mango,Banana,Guava', ','))

GO
/****** Object:  StoredProcedure [dbo].[sp_vendoritemsupdation]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_vendoritemsupdation](@vid int,@Vpid int=null,@psid int=null)  
--exec [sp_vendoritemsupdation] 10,13,525
AS
begin  
   --insert into Vendor_Products(vid,prod_subcat_id)values(@vid,@prod_subcat_id) 
   declare @count int
   set @count=(select COUNT(Vpid) from Vendor_Products where Vid=@vid and prod_subcat_id =@psid)
   print @count
  
   if (@count=0)
   begin
	update Vendor_Products set prod_subcat_id=@psid,updatedon=CONVERT(varchar(10),GETDATE(),105),updatedby=(select FirstName+'_'+LastName as name from [User] where UID=@vid) where Vid=@vid and Vpid=@Vpid
	end

end  



--insert into Vendor_Products(vid,prod_subcat_id)(SELECT 10,Item FROM dbo.SplitString('Apple,Mango,Banana,Guava', ','))
select*from Products_Types
select*from Products_Category
select*from Products_Subcategory
GO
/****** Object:  StoredProcedure [dbo].[Sp_vendorregistration]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================    
-- Author:  <Author,,k.malleswararao>    
-- Create date: <Create Date,11/29/2018,>    
-- Description: <vendormodule>    
-- =============================================    
CREATE PROCEDURE [dbo].[Sp_vendorregistration]    
-- Add the parameters for the stored procedure here    
--exec Sp_vendor 'max','rjy','mm@g.com','4561237890',1,'412536','Male',0,'C:\fakepath\shopsale.jpg','C:\fakepath\artem-bali-622295-unsplash.jpg',2,getdate,'Insupd',null    
@Firstname varchar(50)=null,      
@Lastname varchar(50)=null,      
@Email varchar(50)=null,      
@PhoneNo varchar(20)=null,    
@PID INT =null,    
@pname varchar(50)=null,    
@Password varchar(10)=null,       
@Gender varchar(10)=null,     
@IsActive int=null,     
@Image varchar(200)=null,    
@Logo varchar(200)=null,    
@RoleID int=null,    
@DOR varchar(100)=null,    
@Imode varchar(50)=null,    
@UID INT=NULL,    
@id int=null output    
AS    
BEGIN    
    
     
if exists(select UID from [User] where Email=@Email)    
 begin    
  UPDATE [dbo].[User] SET Firstname=@Firstname,Lastname=@Lastname,Email=@Email,Password=@Password,PhoneNo=@PhoneNo,Gender=@Gender,Image=@Image,RoleID=@RoleID    
   WHERE UID =@UID    
  
   UPDATE [dbo].[Vendor] SET Logo=@Logo,IsActive=@IsActive WHERE VID=@UID  
 end   
  
 else    
    
begin    
  Insert Into [dbo].[User] (FirstName,LastName,Email,Password,PhoneNo,Gender,Image,RoleID) Values (@Firstname,@Lastname,@Email,@Password, @PhoneNo,@Gender,@Image,2)    
  SET @id=SCOPE_IDENTITY()    
   if(@id!=0)    
   begin    
 Insert Into Vendor (VID,Logo,DOR,IsActive) Values (@id,@Logo,CONVERT(date,GETDATE(),103),@IsActive)    
   end    
end    
END 
GO
/****** Object:  StoredProcedure [dbo].[sp_vendortotitems]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_vendortotitems](@vid int)
as
begin
select i.itm_id,i.it_name,i.cat_img,p.pscName,c.pcName,t.PName from Items i inner join Products_Subcategory p on i.prod_subcat_id=p.prod_subcat_id
inner join Products_Category c on c.prod_cat_id=p.prod_cat_id inner join Products_Types t on t.PID=c.PID
where vid=@vid order by itm_id desc
end
GO
/****** Object:  StoredProcedure [dbo].[sp_vitemdel]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_vitemdel](@Vpid int)  
--exec [sp_vendoritems] 10,null,5,524
AS
begin  

 --delete Vendor_Products where Vpid=@Vpid

 update Vendor_Products set isactive=0 where Vpid=@Vpid

end  



GO
/****** Object:  StoredProcedure [dbo].[spAddEmployee]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spAddEmployee]         
(        
    @Name VARCHAR(20),         
    @City VARCHAR(20),        
    @Department VARCHAR(20),        
    @Gender VARCHAR(6)        
)        
as         
Begin         
    Insert into tblEmployee (Name,City,Department, Gender)         
    Values (@Name,@City,@Department, @Gender)         
End
GO
/****** Object:  StoredProcedure [dbo].[spAddorEditCategoryByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================        
-- Author:  Sudha        
-- Create date: 10-01-2019        
-- Description: Add / Edit category Details         
-- =============================================      
CREATE PROCEDURE [dbo].[spAddorEditCategoryByAdmin]   (      
@prod_cat_id int,     
@pcName varchar(50),    
@PID int,  
@IsActive bit      
)       
AS        
BEGIN      
      
IF EXISTS(SELECT * FROM [dbo].[Products_Category] WHERE prod_cat_id= @prod_cat_id and PID=@PID)      
   BEGIN      
    --This means it exists      
   UPDATE [dbo].[Products_Category] SET     
   pcName=@pcName,       
   IsActive=@IsActive     
      WHERE prod_cat_id=@prod_cat_id AND PID = @PID    
   END      
  ELSE      
   BEGIN      
   Insert Into [dbo].[Products_Category] Values (      
   @pcName,  
   @PID,     
   @IsActive    
   )      
   END      
END 
GO
/****** Object:  StoredProcedure [dbo].[spAddorEditProductByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================    
-- Author:  Sudha    
-- Create date: 08-01-201p    
-- Description: Add / Edit product Types Details     
-- =============================================  
CREATE PROCEDURE [dbo].[spAddorEditProductByAdmin]   (  
@PID int, 
@pName varchar(50),
@IsActive bit  
)   
AS    
BEGIN  
  
IF EXISTS(SELECT * FROM [dbo].[Products_Types] WHERE PID= @PID)  
   BEGIN  
    --This means it exists  
   UPDATE [dbo].[Products_Types] SET 
   pName=@pName,   
   IsActive=@IsActive 
      WHERE PID = @PID
   END  
  ELSE  
   BEGIN  
   Insert Into [dbo].[Products_Types] Values (  
   @pName, 
   @IsActive
   )  
   END  
END  
GO
/****** Object:  StoredProcedure [dbo].[spAddorEditSubCategoryByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================          
-- Author:  Sudha          
-- Create date: 10-01-2019          
-- Description: Add / Edit Sub category Details           
-- =============================================        
CREATE PROCEDURE [dbo].[spAddorEditSubCategoryByAdmin]   (        
@prod_subcat_id int,       
@pscName varchar(50),  
@prod_cat_id int,   
@IsActive bit        
)         
AS          
BEGIN        
        
IF EXISTS(SELECT * FROM [dbo].[Products_Subcategory] WHERE prod_subcat_id= @prod_subcat_id and prod_cat_id=@prod_cat_id )        
   BEGIN        
    --This means it exists        
   UPDATE [dbo].[Products_Subcategory] SET       
   pscName=@pscName,  
   prod_cat_id=@prod_cat_id,         
   IsActive=@IsActive       
      WHERE prod_subcat_id=@prod_subcat_id  
   END        
  ELSE        
   BEGIN        
   Insert Into [dbo].[Products_Subcategory] Values (        
   @pscName,    
   @prod_cat_id,       
   @IsActive      
   )        
   END        
END 
GO
/****** Object:  StoredProcedure [dbo].[spAddorEditVenderByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================      
-- Author:  Sudha      
-- Create date: 28-12-2018      
-- Description: Inset / Update or Delete Records from admin      
-- =============================================        
CREATE PROCEDURE [dbo].[spAddorEditVenderByAdmin]        
@Firstname varchar(50),          
@Lastname varchar(50),          
@Email varchar(50),          
@PhoneNo varchar(20),        
@Password varchar(10),     
@Gender varchar(10),    
@IsActive int,       
@RoleID int,      
@UID INT,    
@id int output      
AS        
BEGIN   
         
	IF EXISTS(SELECT UID FROM [User] WHERE UID =@UID)        
	 BEGIN        
		UPDATE [dbo].[User] SET Firstname=@Firstname,Lastname=@Lastname,Email=@Email,PhoneNo=@PhoneNo,Gender=@Gender,RoleID=@RoleID  WHERE UID =@UID    
		UPDATE [dbo].[Vendor] SET IsActive=@IsActive WHERE VID=@UID      
	 END       
      
	 ELSE    
		BEGIN        
		  INSERT INTO [dbo].[User] (FirstName,LastName,Email,Password,PhoneNo,Gender,RoleID) VALUES (@Firstname,@Lastname,@Email,@Password, @PhoneNo,@Gender,@RoleID)        
		  SET @id=SCOPE_IDENTITY()        
		  IF(@id!=0)        
		   BEGIN        
			 INSERT INTO Vendor (VID,DOR,IsActive) VALUES (@id,CONVERT(date,GETDATE(),103),@IsActive)        
		   END        
	  END        
END 
GO
/****** Object:  StoredProcedure [dbo].[spChangeVenderStatusByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================      
-- Author:  Sudha      
-- Create date: 03-01-2019      
-- Description: To Change Vendor Active Status      
-- =============================================      
CREATE procedure [dbo].[spChangeVenderStatusByAdmin]        
(@VID varchar(8000) )     
AS      
BEGIN         
 SET NOCOUNT ON;        
        
 --IF EXISTS(SELECT UID from [User]u,[dbo].[Vendor] v  WHERE u.UID=v.VID and u.RoleID=2  and IsActive= @IsActive AND v.VID in (@VID))          
 -- BEGIN       
 -- UPDATE [dbo].[Vendor] SET IsActive = @IsActive WHERE VID in (@VID)    
 --  END       
  
 Declare @IsActiveVal int  
  
 SET @IsActiveVal=(SELECT DISTINCT IsActive FROM [User]u,[dbo].[Vendor] v  WHERE u.UID=v.VID and u.RoleID=2 and v.VID in (SELECT  Convert (int ,item) FROM dbo.SplitString(@VID,',')) and u.UID=v.VID)   
  
 IF @IsActiveVal = 1  
  BEGIN  
 SET @IsActiveVal=0  
  END  
 ELSE  
  BEGIN  
 SET @IsActiveVal=1  
  END  
        
 IF EXISTS(SELECT UID from [User]u,[dbo].[Vendor] v  WHERE u.UID=v.VID and u.RoleID=2  AND v.VID in (SELECT  Convert (int ,item) FROM dbo.SplitString(@VID,',')))          
  BEGIN       
	UPDATE [dbo].[Vendor] SET IsActive = @IsActiveVal WHERE VID in (SELECT  Convert (int ,item) FROM dbo.SplitString(@VID,','))    
   END       
END 
GO
/****** Object:  StoredProcedure [dbo].[spCheckEmail]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 28-12-2018  
-- Description: Get Check Email Exists or Not  
-- =============================================  
CREATE PROCEDURE [dbo].[spCheckEmail] (@Email varchar(50)) 
AS  
BEGIN   
 SET NOCOUNT ON;  
  
    SELECT * FROM  [dbo].[User]  WHERE Email= @Email    
END 
GO
/****** Object:  StoredProcedure [dbo].[spCheckPName]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================    
-- Author:  Sudha    
-- Create date: 07-01-2019    
-- Description: Get Check Product Name Exists or Not    
-- =============================================    
CREATE PROCEDURE [dbo].[spCheckPName] (@PName varchar(50))   
AS    
BEGIN     
 SET NOCOUNT ON;    
    
    SELECT * FROM  [dbo].[Products_Types]  WHERE UPPER(PName)= UPPER(@PName)
END 
GO
/****** Object:  StoredProcedure [dbo].[spCheckUserLoginDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 27-11-2018  
--modify date:11/28/2018(mallesh)
-- Description: Get Login Details  
-- =============================================  
--exec [spCheckUserLoginDetails] 'radhaahilda@gmail.com','123456'
CREATE PROCEDURE [dbo].[spCheckUserLoginDetails](@Email varchar(50),@Password varchar(10))  
AS  
BEGIN   
 SET NOCOUNT ON;  
  
    select UID,FirstName+''+LastName as name,Email,RoleName,PhoneNo,r.RoleID from [dbo].[User] u,[dbo].[Role] r where Email=@Email and Password=@Password and u.RoleID=r.RoleID
	--select * from [dbo].[User] where Email=@Email and Password=@Password
END 
GO
/****** Object:  StoredProcedure [dbo].[spDeleteCategoryByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 08-01-2019  
-- Description: To Change Category Active Status  
-- =============================================  
CREATE procedure [dbo].[spDeleteCategoryByAdmin]    
(@prod_cat_id int)  
AS  
BEGIN     
 SET NOCOUNT ON;    
    
 IF EXISTS(SELECT prod_cat_id from [Products_Category] WHERE prod_cat_id=@prod_cat_id AND IsActive= 1 )      
  BEGIN   
	UPDATE [dbo].[Products_Category] SET IsActive = 0 WHERE prod_cat_id=@prod_cat_id AND IsActive= 1     
   END   
END
GO
/****** Object:  StoredProcedure [dbo].[spDeleteEmployee]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[spDeleteEmployee]         
(          
   @EmpId int          
)          
as           
begin          
   Delete from tblEmployee where EmployeeId=@EmpId          
End
GO
/****** Object:  StoredProcedure [dbo].[spDeleteProductByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 08-01-2019  
-- Description: To Change Product Active Status  
-- =============================================  
CREATE procedure [dbo].[spDeleteProductByAdmin]    
(@PID int)  
AS  
BEGIN     
 SET NOCOUNT ON;    
    
 IF EXISTS(SELECT PID from [Products_Types] WHERE PID=@PID AND IsActive= 1 )      
  BEGIN   
 UPDATE [dbo].[Products_Types] SET IsActive = 0 WHERE PID=@PID AND IsActive= 1     
   END   
END
GO
/****** Object:  StoredProcedure [dbo].[spDeleteSubCategoryByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 08-01-2019  
-- Description: To Change Sub Category Active Status  
-- =============================================  
CREATE procedure [dbo].[spDeleteSubCategoryByAdmin]    
(@prod_subcat_id int)  
AS  
BEGIN     
 SET NOCOUNT ON;    
    
 IF EXISTS(SELECT prod_subcat_id from [Products_Subcategory] WHERE prod_subcat_id=@prod_subcat_id AND IsActive= 1 )      
  BEGIN   
	UPDATE [dbo].[Products_Subcategory] SET IsActive = 0 WHERE prod_subcat_id=@prod_subcat_id AND IsActive= 1     
   END   
END
GO
/****** Object:  StoredProcedure [dbo].[spDeleteVenderByAdmin]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sudha
-- Create date: 02-01-2019
-- Description:	To Change Vendor Active Status
-- =============================================
CREATE procedure [dbo].[spDeleteVenderByAdmin]  
(@VID int)
AS
BEGIN   
 SET NOCOUNT ON;  
  
 IF EXISTS(SELECT UID from [User]u,[dbo].[Vendor] v  WHERE u.UID=v.VID and u.RoleID=2  and IsActive= 1 AND v.VID=@VID)    
  BEGIN 
	UPDATE [dbo].[Vendor] SET IsActive = 0 WHERE VID=@VID AND IsActive= 1	  
   END 
END
GO
/****** Object:  StoredProcedure [dbo].[spGetAllEmployees]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[spGetAllEmployees]      
as      
Begin      
    select *      
    from tblEmployee   
    order by EmployeeId 
End
GO
/****** Object:  StoredProcedure [dbo].[spGetAllProducts_Category]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================        
-- Author:  Sudha        
-- Create date: 10-01-2019        
-- Description: To Get all category Details         
-- =============================================      
CREATE PROCEDURE  [dbo].[spGetAllProducts_Category]
AS  
BEGIN  
SELECT DISTINCT c.prod_cat_id,p.pid,c.pcname FROM Products_Category c INNER JOIN Products_Types p  ON c.pid=p.pid
 WHERE c.IsActive=1   
END 
GO
/****** Object:  StoredProcedure [dbo].[spGetAllProductsByActiveStatus]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 07-01-2019  
-- Description: Get All Products Details By Active Status  
-- =============================================  
CREATE procedure [dbo].[spGetAllProductsByActiveStatus]    
(@IsActive bit)  
AS  
BEGIN     
 SET NOCOUNT ON;    
    
    SELECT PID,PName    
  FROM  [dbo].[Products_Types]     
  WHERE IsActive= @IsActive  
  ORDER BY PName  ASC
      
END
GO
/****** Object:  StoredProcedure [dbo].[spGetAllUserDetailsByID ]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 28-11-2018  
-- Description: Get Details  By ID 
-- =============================================
CREATE PROCEDURE [dbo].[spGetAllUserDetailsByID ] (
@UID int
)	
AS  
BEGIN
   SELECT * FROM [dbo].[User] WHERE UID = @UID
		
END
GO
/****** Object:  StoredProcedure [dbo].[spGetAllUsersData]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spGetAllUsersData]  
as  
begin  
select * from [dbo].[User]  
end;
GO
/****** Object:  StoredProcedure [dbo].[spGetAllUsersList]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 19-12-2018  
-- Description: Get All User Details  
-- =============================================  
CREATE PROCEDURE [dbo].[spGetAllUsersList]  
AS  
BEGIN   
 SET NOCOUNT ON;  
  
    SELECT *  FROM  [dbo].[User] WHERE RoleID=3  
    
END  
GO
/****** Object:  StoredProcedure [dbo].[spGetAllVendorsByActiveStatus]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sudha
-- Create date: 02-01-2019
-- Description:	Get All Vendor Details By Active Status
-- =============================================
CREATE procedure [dbo].[spGetAllVendorsByActiveStatus]  
(@IsActive bit)
AS
BEGIN   
 SET NOCOUNT ON;  
  
    SELECT *  
  FROM  [dbo].[User] u,[dbo].[Vendor] v  
  WHERE u.UID=v.VID and u.RoleID=2  and IsActive= @IsActive
  ORDER BY u.uid
    
END  
GO
/****** Object:  StoredProcedure [dbo].[spGetAllVendorsList]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sudha
-- Create date: 14-12-2018
-- Description:	Get All Vendor Details
-- =============================================
CREATE PROCEDURE [dbo].[spGetAllVendorsList]
AS
BEGIN	
	SET NOCOUNT ON;

    SELECT *
		FROM  [dbo].[User] u,[dbo].[Vendor] v
		WHERE u.UID=v.VID and u.RoleID=2 ORDER BY u.uid
		
END
GO
/****** Object:  StoredProcedure [dbo].[spGeyAllOrderDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================                  
-- Author:  Sudha                 
-- Create date: 18/01/2019                  
-- Description: To get All orders              
-- =============================================                  
CREATE PROCEDURE  [dbo].[spGeyAllOrderDetails]               
AS                  
BEGIN       
 SELECT DISTINCT u.Firstname + ' ' + u.LastName as UserName,itmord.ord_date,itmord.amount,itmord.ord_status,      
 (SELECT  s.Firstname + ' ' + s.LastName FROM [dbo].[User] s WHERE s.UID in(i.vid))as VendorName,i.it_name      
  FROM [dbo].[User] u       
 INNER JOIN      
  [dbo].[Item_Orders] itmord ON u.uid=itmord.uid      
 INNER JOIN      
  [dbo].[Items_Bag] itmb ON itmb.ord_id=itmord.ord_id       
 INNER JOIN      
  Items i on i.itm_id IN ( select Item from dbo.SplitString(itmord.itm_id,','))      
    
 END 
GO
/****** Object:  StoredProcedure [dbo].[spGeyAllProducts_Category_SubcategoryList]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 -- =============================================          
-- Author:  Sudha         
-- Create date: 10/01/2019          
-- Description: To get All the Active Products, 
--				categorirs and Sub categories  list
-- =============================================          
CREATE PROCEDURE  [dbo].[spGeyAllProducts_Category_SubcategoryList]   
AS          
BEGIN          
  SELECT p.PName,c.pcName,sc.pscName,p.pid,c.prod_cat_id,sc.prod_subcat_id FROM Products_Subcategory sc INNER JOIN Products_Category c ON    
 sc.prod_cat_id=c.prod_cat_id  INNER JOIN Products_Types p ON  c.PID=p.PID             
 WHERE c.IsActive=1  AND sc.IsActive=1 AND p.IsActive= 1 ORDER BY p.pname ASC,c.pcName asc ,sc.pscName asc
     
END
GO
/****** Object:  StoredProcedure [dbo].[spGeyAllProducts_CategoryByActiveStatus]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 -- =============================================        
-- Author:  Sudha       
-- Create date: 08/01/2019        
-- Description: To get All the Active categories    
-- =============================================        
CREATE PROCEDURE  [dbo].[spGeyAllProducts_CategoryByActiveStatus]  (    
@IsActive bit )    
AS        
BEGIN        
 SELECT c.prod_cat_id,c.pcName,p.PID FROM Products_Category c INNER JOIN Products_Types p ON c.PID=p.PID        
 WHERE c.IsActive=@IsActive  AND p.IsActive=@IsActive  ORDER BY pname ASC    
  
 --SELECT cat_id,pcName FROM [dbo].[Category_Types]    
 --WHERE IsActive=@IsActive  ORDER BY pcName ASC  
END 
GO
/****** Object:  StoredProcedure [dbo].[spGeyAllProducts_SubcategoryByActiveStatus]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 -- =============================================          
-- Author:  Sudha         
-- Create date: 08/01/2019          
-- Description: To get All the Active Sub categories      
-- =============================================          
CREATE PROCEDURE  [dbo].[spGeyAllProducts_SubcategoryByActiveStatus]  (      
@IsActive bit )      
AS          
BEGIN          
 SELECT sc.prod_subcat_id,sc.pscName,c.prod_cat_id,c.pcName,p.pid,p.PName FROM Products_Subcategory sc INNER JOIN Products_Category c ON    
 sc.prod_cat_id=c.prod_cat_id  INNER JOIN Products_Types p ON  c.PID=p.PID             
 WHERE c.IsActive=@IsActive  AND sc.IsActive=@IsActive AND p.IsActive= @IsActive ORDER BY pscname ASC    
   
  --SELECT subcat_id,pscName FROM[dbo].[Subcategory_Types]   
  --WHERE IsActive=@IsActive  ORDER BY pscName ASC  
     
END 
GO
/****** Object:  StoredProcedure [dbo].[spRegistration]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Sudha  
-- Create date: 27-11-2018  
-- Description: Register Details   
-- =============================================
CREATE PROCEDURE [dbo].[spRegistration]   (
@Firstname varchar(50),  
@Lastname varchar(50),  
@Email varchar(50),  
@PhoneNo varchar(10),
@Password varchar(10),   
@Gender varchar(10),  
--@Address varchar(500), 
@OTP int,
@Image varchar(200),
@RoleID int
)	
AS  
BEGIN

IF EXISTS(SELECT * FROM [dbo].[User] WHERE Email = @Email)
		 BEGIN
		  --This means it exists
			UPDATE [dbo].[User] SET 
			Firstname=@Firstname,
			Lastname=@Lastname,
			Email=@Email,
			Password=@Password,		
			PhoneNo=@PhoneNo,
			Gender=@Gender,			
			OTP=@OTP,
			Image=@Image,
			RoleID=@RoleID
						WHERE Email = @Email
		 END
		ELSE
		 BEGIN
			Insert Into [dbo].[User] Values (
			@Firstname,
			@Lastname,
			@Email,
			@Password,	
			@PhoneNo,
			@Gender,							
			@OTP,
			@Image,
			@RoleID
			)
		 END
END
GO
/****** Object:  StoredProcedure [dbo].[spUpdateEmployee]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[spUpdateEmployee]          
(          
   @EmpId INTEGER ,        
   @Name VARCHAR(20),         
   @City VARCHAR(20),        
   @Department VARCHAR(20),        
   @Gender VARCHAR(6)        
)          
as          
begin          
   Update tblEmployee           
   set Name=@Name,          
   City=@City,          
   Department=@Department,        
   Gender=@Gender          
   where EmployeeId=@EmpId          
End
GO
/****** Object:  StoredProcedure [dbo].[UpdateAddress]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[UpdateAddress](@AID int,@UID int,@Address varchar(500),@Town varchar(100),@City varchar(100),@Pincode int,@State varchar(100),@Type varchar(50),@avaldays varchar(100),@Time varchar(50))
as
begin
update Address set Address=@Address,Town=@Town,City=@City,Pincode=@Pincode,State=@State,Type=@Type,avaldays=@avaldays,Time=@Time where AID=@AID and UID=@UID;
end;
GO
/****** Object:  StoredProcedure [dbo].[UpdateBagDetails]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--------------------------------------updating bag details


CREATE procedure [dbo].[UpdateBagDetails](@bag_id int,@qunty int,@size varchar(100),@type int,@price int)
as

begin
if(@type=1)
begin
update Items_Bag set qunty=@qunty,price=@price where bag_id=@bag_id;
end
else if(@type=2)
begin
update Items_Bag set size=@size where bag_id=@bag_id;
end;
end;
GO
/****** Object:  StoredProcedure [dbo].[UpdatePassword]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   procedure [dbo].[UpdatePassword](@UID int,@Password varchar(10))
as
begin

update [dbo].[User] set Password=@Password where UID=@UID;
end;
GO
/****** Object:  StoredProcedure [dbo].[updateprofilephoto]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[updateprofilephoto](@UID int, @Image varchar(200))
as
begin
update [dbo].[User] set Image=@Image where UID=@UID;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserDataById]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[UpdateUserDataById](@uid int,@Firstname varchar(50),  
@Lastname varchar(50),  
@Email varchar(50),  
@PhoneNo varchar(10),
   
@Gender varchar(10))

as
begin

UPDATE [dbo].[User] SET 
			Firstname=@Firstname,
			Lastname=@Lastname,
			Email=@Email,
				
			PhoneNo=@PhoneNo,
			Gender=@Gender
			
						WHERE UID=@UID;
						end;
GO
/****** Object:  StoredProcedure [rpt].[GetAllProductsData]    Script Date: 2/12/2020 5:22:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/****** Object:  Schema [rpt]    Script Date: 5/13/2019 3:20:41 PM ******/
create   procedure [rpt].[GetAllProductsData](
@pid int,
@infotype char(2)
)
as
begin 
set nocount on

if(@infotype='PD')
  BEGIN
    select PID,Pname from Products_Types where IsActive=1 and PID=@pid;
  END
IF(@infotype='CD')
  BEGIN
      select prod_cat_id,pcName,c.PID from Products_Category c inner join Products_Types t on c.PID=t.PID  
 where c.PID=@pid  AND t.IsActive=1
   END
END


GO
