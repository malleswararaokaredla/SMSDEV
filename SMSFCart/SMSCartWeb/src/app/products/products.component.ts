// import { Component, OnInit, ElementRef, ViewChild, VERSION,Injectable } from '@angular/core';
// import { NavItem } from '../services/smsfashionapi.service';
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NavService } from '../services/nav.service';

// import {SelectionModel} from '@angular/cdk/collections';
// import {FlatTreeControl} from '@angular/cdk/tree';
// import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
// import {BehaviorSubject} from 'rxjs';

// /**
//  * Node for to-do item
//  */
// export class TodoItemNode {
//   children: TodoItemNode[];
//   item: string;
// }

// /** Flat to-do item node with expandable and level information */
// export class TodoItemFlatNode {
//   item: string;
//   level: number;
//   expandable: boolean;
// }

// /**
//  * The Json object for to-do list data.
//  */
// const TREE_DATA = {
//   Products: {  
//   }
// };

// @Injectable()
// export class ChecklistDatabase {
//   dataChange = new BehaviorSubject<TodoItemNode[]>([]);

//   get data(): TodoItemNode[] { return this.dataChange.value; }

//   constructor() {
//     this.initialize();
//   }

//   initialize() {
//     // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
//     //     file node as children.
//     const data = this.buildFileTree(TREE_DATA, 0);

//     // Notify the change.
//     this.dataChange.next(data);
//   }

//   /**
//    * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
//    * The return value is the list of `TodoItemNode`.
//    */
//   buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
//     return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
//       const value = obj[key];
//       const node = new TodoItemNode();
//       node.item = key;

//       if (value != null) {
//         if (typeof value === 'object') {
//           node.children = this.buildFileTree(value, level + 1);
//         } else {
//           node.item = value;
//         }
//       }

//       return accumulator.concat(node);
//     }, []);
//   }

//   /** Add an item to to-do list */
//   insertItem(parent: TodoItemNode, name: string) {
//     if (parent.children) {
//       parent.children.push({item: name} as TodoItemNode);
//       this.dataChange.next(this.data);
//     }
//   }

//   updateItem(node: TodoItemNode, name: string) {
//     node.item = name;
//     this.dataChange.next(this.data);
//   }
// }

// /**
//  * @title Tree with checkboxes
//  */
// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.scss'],
//   providers: [ChecklistDatabase]
// })
// export class ProductsComponent implements OnInit {

//   @ViewChild('appDrawer') appDrawer: ElementRef;
//   version = VERSION;  
//   navItems: NavItem[];//List Items array

//   uType :string="";  
//   RoleName:string="";


//    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
//    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

//    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
//    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
 
//    /** A selected parent node to be inserted */
//    selectedParent: TodoItemFlatNode | null = null;
 
//    /** The new item's name */
//    newItemName = '';
 
//    treeControl: FlatTreeControl<TodoItemFlatNode>;
 
//    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
 
//    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 
//    /** The selection for checklist */
//    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);





//   constructor(private toastr : ToastrService,private route:ActivatedRoute,
//   private router: Router,private navService: NavService,private database: ChecklistDatabase) 
//   {
//     //To get menu
//     this.navItems= this.navService.navItems;

//     this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
//     this.isExpandable, this.getChildren);
//     this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
//     this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

//     database.dataChange.subscribe(data => {
//       this.dataSource.data = data;
//     });
//   }

//   getLevel = (node: TodoItemFlatNode) => node.level;

//   isExpandable = (node: TodoItemFlatNode) => node.expandable;

//   getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

//   hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

//   hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

//   /**
//    * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
//    */
//   transformer = (node: TodoItemNode, level: number) => {
//     const existingNode = this.nestedNodeMap.get(node);
//     const flatNode = existingNode && existingNode.item === node.item
//         ? existingNode
//         : new TodoItemFlatNode();
//     flatNode.item = node.item;
//     flatNode.level = level;
//     flatNode.expandable = !!node.children;
//     this.flatNodeMap.set(flatNode, node);
//     this.nestedNodeMap.set(node, flatNode);
//     return flatNode;
//   }

//   // /** Whether all the descendants of the node are selected. */
//   // descendantsAllSelected(node: TodoItemFlatNode): boolean {
//   //   const descendants = this.treeControl.getDescendants(node);
//   //   const descAllSelected = descendants.every(child =>
//   //     this.checklistSelection.isSelected(child)
//   //   );
//   //   return descAllSelected;
//   // }

//   // /** Whether part of the descendants are selected */
//   // descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
//   //   const descendants = this.treeControl.getDescendants(node);
//   //   const result = descendants.some(child => this.checklistSelection.isSelected(child));
//   //   return result && !this.descendantsAllSelected(node);
//   // }

//   // /** Toggle the to-do item selection. Select/deselect all the descendants node */
//   // todoItemSelectionToggle(node: TodoItemFlatNode): void {
//   //   this.checklistSelection.toggle(node);
//   //   const descendants = this.treeControl.getDescendants(node);
//   //   this.checklistSelection.isSelected(node)
//   //     ? this.checklistSelection.select(...descendants)
//   //     : this.checklistSelection.deselect(...descendants);

//   //   // Force update for the parent
//   //   descendants.every(child =>
//   //     this.checklistSelection.isSelected(child)
//   //   );
//   //   this.checkAllParentsSelection(node);
//   // }

//   // /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
//   // todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
//   //   this.checklistSelection.toggle(node);
//   //   this.checkAllParentsSelection(node);
//   // }

//   // /* Checks all the parents when a leaf node is selected/unselected */
//   // checkAllParentsSelection(node: TodoItemFlatNode): void {
//   //   let parent: TodoItemFlatNode | null = this.getParentNode(node);
//   //   while (parent) {
//   //     this.checkRootNodeSelection(parent);
//   //     parent = this.getParentNode(parent);
//   //   }
//   // }

//   // /** Check root node checked state and change it accordingly */
//   // checkRootNodeSelection(node: TodoItemFlatNode): void {
//   //   const nodeSelected = this.checklistSelection.isSelected(node);
//   //   const descendants = this.treeControl.getDescendants(node);
//   //   const descAllSelected = descendants.every(child =>
//   //     this.checklistSelection.isSelected(child)
//   //   );
//   //   if (nodeSelected && !descAllSelected) {
//   //     this.checklistSelection.deselect(node);
//   //   } else if (!nodeSelected && descAllSelected) {
//   //     this.checklistSelection.select(node);
//   //   }
//   // }

//   // /* Get the parent node of a node */
//   // getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
//   //   const currentLevel = this.getLevel(node);

//   //   if (currentLevel < 1) {
//   //     return null;
//   //   }

//   //   const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

//   //   for (let i = startIndex; i >= 0; i--) {
//   //     const currentNode = this.treeControl.dataNodes[i];

//   //     if (this.getLevel(currentNode) < currentLevel) {
//   //       return currentNode;
//   //     }
//   //   }
//   //   return null;
//   // }

//   /** Select the category so we can insert the new item. */
//   addNewItem(node: TodoItemFlatNode) {
//     const parentNode = this.flatNodeMap.get(node);
//     this.database.insertItem(parentNode!, '');
//     this.treeControl.expand(node);
//   }

//   /** Save the node to database */
//   saveNode(node: TodoItemFlatNode, itemValue: string) {
//     const nestedNode = this.flatNodeMap.get(node);
//     this.database.updateItem(nestedNode!, itemValue);
//   }

//   cancleNode(node: TodoItemFlatNode, itemValue: string)
//   {
//     const nestedNode = this.flatNodeMap.get(node);
//     //this.database.(nestedNode!, itemValue);
//   }

//   ngOnInit() {
//      //This is to get Type
//      this.uType = sessionStorage.getItem('UType'); 

//      //This for side menu 
//      this.navService.appDrawer = this.appDrawer;
 
//      //To get menu
//      this.navItems= this.navService.navItems;       
//   }

// }



import { Component, OnInit, ElementRef, VERSION, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { AddProduct } from '../models/AddProduct';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { NavItem } from '../models/nav-item';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { ProductValidatorService } from '../services/product-validator.service';

import { EntryService } from '../services/entry.service';
import { AddCategory } from '../models/AddCategory';
import { AddSubCategory } from '../models/AddSubCategory';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';

@Component({
  selector: 'app-products',
  providers: [
    {provide: ValidatorService, useClass: ProductValidatorService }
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;  
  
  Role:string;
  Ltype:string;

  Addproduct: AddProduct ={
    pid : 0,
    pName : null,
    IsActive:1,   
  };

  Addcategory: AddCategory ={
    pid : 0,
     prod_cat_id:0,
    cat_id:0,
    pcName : null,
    IsActive:1,   
  };

  Addsubcategory: AddSubCategory ={    
    prod_cat_id:0,
    prod_subcat_id:0,
    subcat_id:0,
    pscName : null,
    IsActive:1,   
  };

  
  pshow:boolean ;
  cshow:boolean ;
  scshow:boolean ;

  navItems: NavItem[];//List Items array

  productList1:Array<any> = [];

  columnsToDisplayforProduct = ['pName','actionsColumn'];
   
  @Input() productList:Array<any>=[] ;

  @Output() productListChange = new EventEmitter<AddProduct[]>();

  pdataSource: TableDataSource<AddProduct>;

  columnsToDisplayforCategory = ['pid','pcName','actionsColumn'];
  @Input() categoryList:Array<any>=[] ;

  @Output() categoryListChange = new EventEmitter<AddCategory[]>();

  cdataSource: TableDataSource<AddCategory>;


  columnsToDisplayforSubCategory = ['prod_cat_id','pscName','actionsColumn'];

  @Input() subcategorytList:Array<any>=[] ;

  @Output() subcategoryListChange = new EventEmitter<AddSubCategory[]>();

  scdataSource: TableDataSource<AddSubCategory>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  // MatPaginator Inputs
   length = 1;
   pageSize = 1;
   pageSizeOptions = [1, 5, 10, 25, 100];
 
   // MatPaginator Output
   pageEvent: PageEvent;
 
   setPageSizeOptions(setPageSizeOptionsInput: string) {
     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
   }


  uType :string="";  
  PageName:string="";
 

  products: string[];
  categories:string[];
  subcategories:string[]
 
  pid:number; 
  strpName: string; 
  IsProductExists:boolean = true;

  pcid:number; 
  pscid:number; 
   
  res:boolean=false;

  constructor(private adminService: AdminService,private toastr : ToastrService,private route:ActivatedRoute,
  private router: Router,private navService: NavService//, private commonService: CommonService
  ,private ProductValidator: ValidatorService,private entryService: EntryService
  ) 
  {      
    //To get menu
    this.navItems= this.navService.navItems;   
  }  

 
  ngOnInit() {

    //This is to get Type
    this.uType = sessionStorage.getItem('UType'); 

    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //This is Check Vendor / User collection
     this.Role = this.route.snapshot.params['Role']; 
         
    this.PageName="Products";

  //To load First time
    this.getpList();    
  }

  stepClick(ev) {    
    if(ev["selectedIndex"] == 0)
    {
      this.getpList(); 
    }
    if(ev["selectedIndex"] == 1)
    {
      this.getproducts();
      this.getcList();
    }
    if(ev["selectedIndex"] == 2)
    {
      this.GetAllCategories();     
      this.getscList();
    }
    
  
  }

getpList()
{   
  //Load Products Data
    this.adminService.GetAllProductsByActiveStatus(1).subscribe((pdata: AddProduct[])=>{
      this.productList = pdata["productdata"]["table"]; 
    
      if(this.productList.length > 0) 
      {
        this.pshow = true;
      }
      else{
        this.pshow=false;
      }
      this.pdataSource = new TableDataSource<any>(this.productList, AddProduct, this.ProductValidator);      
      this.pdataSource.datasourceSubject.subscribe(productList => this.productListChange.emit(productList));
      
    },
    error => {
      if (error["status"] == 401) {         
        this.toastr.error("Your session expired");
        sessionStorage.clear();
        this.router.navigate(['/vendor']);
      }
    }); 

  }

    //Load Category Data
getcList()
{
    this.adminService.GetAllCategoriesByActiveStatus(1).subscribe((cdata: AddCategory[])=>{
      this.categoryList = cdata["categorydata"]["table"]; 
    
      if(this.categoryList.length > 0) 
      {
        this.cshow = true;
      }
      else{
        this.cshow=false;
      }
      this.cdataSource = new TableDataSource<any>(this.categoryList, AddCategory, this.ProductValidator);      
      this.cdataSource.datasourceSubject.subscribe(categoryList => this.categoryListChange.emit(categoryList));

      
    },
    error => {
      if (error["status"] == 401) {         
        this.toastr.error("Your session expired");
        sessionStorage.clear();
        this.router.navigate(['/vendor']);
      }
    }); 

}


//Load Sub Category Data
getscList()
{
  this.adminService.GetAllSubCategoriesByActiveStatus(1).subscribe((scdata: AddSubCategory[])=>{
    this.subcategorytList = scdata["scategorydata"]["table"]; 
  
    if(this.subcategorytList.length > 0) 
    {
      this.scshow = true;
    }
    else{
      this.scshow=false;
    }      
    this.scdataSource = new TableDataSource<any>(this.subcategorytList, AddSubCategory, this.ProductValidator);  
    this.scdataSource.datasourceSubject.subscribe(subcategorytList => this.subcategoryListChange.emit(subcategorytList));

  },
  error => {
    if (error["status"] == 401) {         
      this.toastr.error("Your session expired");
      sessionStorage.clear();
      this.router.navigate(['/vendor']);
    }
  }); 
}

getproducts() {
  this.entryService.getproducts().subscribe(
    data => {
      this.products = data as string[];
    },
    error => {
      if (error["status"] == 401) {         
        this.toastr.error("Your session expired");
        sessionStorage.clear();
        this.router.navigate(['/vendor']);
      }
    }); 
}

GetAllCategories()
{
  this.adminService.GetAllCategories().subscribe(
    data => {
      this.categories = data as string[];
    },
    error => {
      if (error["status"] == 401) {         
        this.toastr.error("Your session expired");
        sessionStorage.clear();
        this.router.navigate(['/vendor']);
      }
    }); 
}

UniqueProduct(pName,pid) : boolean
{
      this.adminService.CheckProductNameIsExist(pName).subscribe(data =>
      { 
        if(data["res"] != pid ) 
        {
          if(data["res"] > 0) 
          {
            this.res = true;
          }
          if(data["res"] == 0) 
          {
            this.res = false;
          }
        }
        else{
          this.res = false;
        }
      },
      error => {
        if (error["status"] == 401) {         
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }     
        this.res = true;
    }) 
    return this.res;
} 


confirmEditCreate(row)
{  
  
  this.pid = Number.parseInt(row["currentData"]["pid"]);  
  
  this.strpName = row["currentData"]["pName"]; 

//Product Validation
    this.IsProductExists = this.UniqueProduct(this.strpName,this.pid);     
    
    if(!this.IsProductExists)
      {         
           this.Addproduct.pid= this.pid;
           this.Addproduct.pName=this.strpName;
         this.Addproduct.IsActive=1;

          this.adminService.AddorEditProductByAdmin(this.Addproduct) 
          .subscribe((data: any) => {  
            //This is to fill product list
             this.getpList();   
             this.toastr.success("Product Added / Updated Successfully");
             this.toastr.success(data["res"],"Product Added / Updated Successfully");
          },
          error =>{
            this.toastr.error(error,"Product Not Add / Updated "); 
          });     
       } 
      else
      {
         this.toastr.warning("Product Name Already Exist"); 
      } 
  }   
 
 cancelOrDelete(pid) 
  {    
      if (confirm('Are you sure to delete this record ?') == true) 
      {   
        if (pid != 0) 
        {
            this.adminService.DeleteProduct(pid)
            .subscribe(x => {
              this.getpList();
              this.toastr.success("Deleted Successfully","Product");
            })
        }
      }  
      else
      {
        this.getpList();
      }              
  }

  UpdatePID(pid)
  {  
    this.pid=pid;
  }
  
confirmEditCreate_c(row)
{ 

  if ( this.pid == undefined) 
  {
  this.pid=  Number.parseInt(row["currentData"]["pid"]);  
  }   
  this.pcid = Number.parseInt(row["currentData"]["prod_cat_id"]);  
  this.Addcategory.prod_cat_id= this.pcid;  
  this.Addcategory.pcName=row["currentData"]["pcName"];
  this.Addcategory.pid=this.pid;
  this.Addcategory.IsActive=1;

  this.adminService.AddorEditCategoryByAdmin(this.Addcategory) 
  .subscribe((data: any) => {  
    //This is to fill Category list
      this.getcList();   
      this.toastr.success("Category Added / Updated Successfully");
      this.toastr.success(data["res"],"Category Added / Updated Successfully");
  },
  error =>{
    this.toastr.error(error,"Category Not Add / Updated "); 
  });     
      
  }  
  
cancelOrDelete_c(pcid) 
{    
    if (confirm('Are you sure to delete this record ?') == true) 
    {   
      if (pcid != 0) 
      {
          this.adminService.DeleteCategory(pcid)
          .subscribe(x => {
            this.getcList();
            this.toastr.success("Deleted Successfully","Category");
          })
      }
    }  
    else
    {
      this.getcList();
    }              
}

UpdatecatID(cid)
  {
  this.pcid=cid;
  }



confirmEditCreate_sc(row)
{  
  if ( this.pcid == undefined) 
  {
  this.pcid=  Number.parseInt(row["currentData"]["prod_cat_id"]);  
  }   
  this.pscid = Number.parseInt(row["currentData"]["prod_subcat_id"]); 
  this.Addcategory.prod_cat_id= this.pcid;
  this.Addcategory.pcName=row["currentData"]["pscName"];  
  this.Addcategory.IsActive=1;

  this.adminService.AddorEditSubCategoryByAdmin(this.Addcategory) 
  .subscribe((data: any) => {  
    //This is to fill Category list
      this.getscList();   
      this.toastr.success("Sub Category Added / Updated Successfully");
      this.toastr.success(data["res"],"Sub Category Added / Updated Successfully");
  },
  error =>{
    this.toastr.error(error,"Sub Category Not Add / Updated "); 
  });     
      
  }  
  
cancelOrDelete_sc(pscid) 
{  
  if (confirm('Are you sure to delete this record ?') == true) 
    {   
      if (pscid != 0) 
      {
          this.adminService.DeleteSubCategory(pscid)
          .subscribe(x => {
            this.getscList();
            this.toastr.success("Deleted Successfully","Sub Category");
          })
      }
    }  
    else
    {
      this.getscList();
    }              
}
}
