package com.yuvaraj.Tomato;

import java.awt.Window.Type;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**

 */
@Path("myresource")
public class MyResource {

	public class ShopData {
	    private String shopId;
	    private String shopName;
	    private String shopLocation;
	    private String shopOpeningTime;
	    private String shopClosingTime;
	    private String shopCuisine;
	    private String shopImage;

	    ShopData(String id,String name, String location, String start, String close, String cuisine) {
            this.shopId=id;
        	this.shopName = name;
            this.shopLocation = location;
            this.shopClosingTime = close;
            this.shopOpeningTime = start;
            this.shopCuisine = cuisine;
            
        }
	    public String getShopId() {
	        return shopId;
	    }

	    public void setShopId(String shopId) {
	        this.shopId = shopId;
	    }

	    public String getShopName() {
	        return shopName;
	    }

	    public void setShopName(String shopName) {
	        this.shopName = shopName;
	    }

	    public String getShopLocation() {
	        return shopLocation;
	    }

	    public void setShopLocation(String shopLocation) {
	        this.shopLocation = shopLocation;
	    }

	    public String getShopOpeningTime() {
	        return shopOpeningTime;
	    }

	    public void setShopOpeningTime(String shopOpeningTime) {
	        this.shopOpeningTime = shopOpeningTime;
	    }

	    public String getShopClosingTime() {
	        return shopClosingTime;
	    }

	    public void setShopClosingTime(String shopClosingTime) {
	        this.shopClosingTime = shopClosingTime;
	    }

	    public String getShopCuisine() {
	        return shopCuisine;
	    }

	    public void setShopCuisine(String shopCuisine) {
	        this.shopCuisine = shopCuisine;
	    }
		public void setShopImage(String shopImage) {
			this.shopImage=shopImage;
			
		}
	}

	public class FoodData {
	    private String foodName;
	    private String foodPrice;
	    private String foodQuantity;
	    private String foodImage;
	    private String foodId;
	    private String foodCategory;
	    private String shopId;
	    private String shopName;

	  
		FoodData(String id,String name,String quantity,String price,String category)
    	{
    		this.foodId=id;
    		this.foodName=name;
    		this.foodPrice=price;
    		this.foodQuantity=quantity;
    		this.foodCategory=category;    	}
	    public String getItemName() {
	        return foodName;
	    }
	    public String getItemId() {
	        return foodId;
	    }

	    public void setItemName(String itemName) {
	        this.foodName = itemName;
	    }

	    public String getItemPrice() {
	        return foodPrice;
	    }

	    public void setItemPrice(String itemPrice) {
	        this.foodPrice = itemPrice;
	    }
	    public void setShopId(String id) {
	        this.shopId= id;
	    }
	    public void setShopName(String name) {
	        this.shopName= name;
	    }
	    public String getItemQuantity() {
	        return foodQuantity;
	    }

	    public void setItemQuantity(String itemQuantity) {
	        this.foodQuantity = itemQuantity;
	    }

	    public String getItemImage() {
	        return foodImage;
	    }

	    public void setItemImage(String itemImage) {
	        this.foodImage = itemImage;
	    }
	}

   

public class GetShopData {
    private ArrayList<ShopData> shop;
    private ArrayList<FoodData> breakFasts;
    private ArrayList<FoodData> lunches;
    private ArrayList<FoodData> dinners;
    private ArrayList<FoodData> allFood;

    
    public GetShopData(ArrayList<ShopData> shop,ArrayList<FoodData> allFood) {
    	this.shop=shop;
    	this.allFood=allFood;
    	}

   
    public GetShopData(ArrayList<ShopData> shop, ArrayList<FoodData> breakFasts, ArrayList<FoodData> lunches, ArrayList<FoodData> dinners) {
        this.shop = shop;
        this.breakFasts = breakFasts;
        this.lunches = lunches;
        this.dinners = dinners;
    }


    public ArrayList<ShopData> getShop() {
        return shop;
    }

    public void setShop(ArrayList<ShopData> shop) {
        this.shop = shop;
    }

    public ArrayList<FoodData> getBreakFasts() {
        return breakFasts;
    }

    public void setBreakFasts(ArrayList<FoodData> breakFasts) {
        this.breakFasts = breakFasts;
    }

    public ArrayList<FoodData> getLunches() {
        return lunches;
    }

    public void setLunches(ArrayList<FoodData> lunches) {
        this.lunches = lunches;
    }

    public ArrayList<FoodData> getDinners() {
        return dinners;
    }

    public void setDinners(ArrayList<FoodData> dinners) {
        this.dinners = dinners;
    }
    public void setAllFoodDatas(ArrayList<FoodData> allFood) {
        this.allFood = allFood;
    }
}

class CartData{
private String shopId;
private String shopName;
private String foodId;
private String foodName;
private String foodQuantity;
private String foodPrice;
private String foodImage;
private String couponFound;

CartData(String shopId,String shopName,String foodId,String foodName,String quantity,String price)
{
	this.shopId=shopId;
	this.shopName=shopName;
	this.foodId=foodId;
	this.foodName=foodName;
	this.foodQuantity=quantity;
	this.foodPrice=price;
}
public void setQuantity(String newQuantity)
{
	this.foodQuantity=newQuantity;
}
public void setCoupon(String couponId)
{
	this.couponFound=couponId;
}
public void setItemImage(String foodImage) {
	this.foodImage=foodImage;
	
}

}
@Path("checkAdmin")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@POST
    public Response getAdmin(String admin)
    {   System.out.println(admin);
    	JSONObject json=new JSONObject(admin);
    	String id =json.getString("adminId");
    	String password=json.getString("adminPassword");
    	JSONObject responseJson=new JSONObject();
    	String result=checkManager(id,password);
    	responseJson.put("message",result);
    	
    	
    	return Response.ok(responseJson.toString(),MediaType.APPLICATION_JSON).build();
    }


public String checkManager(String adminId, String adminPassword)
		{    File file;
		    String filePath ="C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";  
		    file=new File(filePath);
		  
		    try {
		    	  Integer adminIntegerId=Integer.parseInt(adminId);
		   
		    	
		    	FileInputStream fis = new FileInputStream(file);
		        XSSFWorkbook workbook = new XSSFWorkbook(fis);
		        XSSFSheet sheet = workbook.getSheet("adminData");
		        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
		       
		            XSSFRow row = sheet.getRow(i);
		            
		                    
		                 
		                    Integer id;
		                    String password;
		                    id= (int) row.getCell(0).getNumericCellValue();
		                    password = row.getCell(1).getStringCellValue();
		                    if(adminIntegerId.equals(id) && adminPassword.equals(password))
		                    		{
		                    	return "success";
		                    		}               
		        }	
		     
		            }
		    catch(Exception e)
		    {
		    	System.out.println(e);
		    }
		    return "failure";
    }

@Path("checkUser")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@POST
    public Response getUser(String user)
    {   System.out.println(user);
    	JSONObject json=new JSONObject(user);
    	String id =json.getString("userEmail");
    	String password=json.getString("userPassword");
    	JSONObject responseJson=new JSONObject();
    	String result=checkUser(id,password);
    	responseJson.put("userId",result);
    	
    	
    	return Response.ok(responseJson.toString(),MediaType.APPLICATION_JSON).build();
    }


public String checkUser(String userEmail, String userPassword)
		{    File file;
		    String filePath ="C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";  
		    file=new File(filePath);
		  
		    try {
		    	
		   
		    	
		    	FileInputStream fis = new FileInputStream(file);
		        XSSFWorkbook workbook = new XSSFWorkbook(fis);
		        XSSFSheet sheet = workbook.getSheet("userData");
		        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
		       
		            XSSFRow row = sheet.getRow(i);
		            
		                    
		                 
		                    String email;
		                    String password;
		                    email= row.getCell(2).getStringCellValue();
		                    password = row.getCell(3).getStringCellValue();
		                    System.out.println(email+password);
		                    if(userEmail.equals(email) && userPassword.equals(password))
		                    		{
		                    	String userId=row.getCell(0).getStringCellValue();
		                    	String userName=row.getCell(1).getStringCellValue();
		                    	return userId+"/"+userName;
		                    		}               
		        }	
		     
		            }
		    catch(Exception e)
		    {
		    	System.out.println(e);
		    }
		    return "notFound";
    }
@Path("userData")
@POST
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response getUserData(String userData)
{   System.out.println(userData);
	JSONObject json=new JSONObject(userData);
    Random random=new Random();
	String id= Integer.toString(random.nextInt(1000000-100000) + 100000);
	String name =json.getString("userName");
	String phone=json.getString("userPhone");
	String email=json.getString("userEmail");
	String password=json.getString("userPassword");
	String city=json.getString("userCity");
	String prefer=json.getString("userPrefer");
	String []userDataAll= {id,name,email,password,phone,city,prefer};
	exportUserData(userDataAll);
	JSONObject responseJson=new JSONObject();
	System.out.println("Mye Data");

	System.out.println(userData);
	responseJson.put("message","Success");
	
	return Response.ok(responseJson.toString(),MediaType.APPLICATION_JSON).build();
}



public void exportUserData(String[] dataString)
{
try {
	String filePath="C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
    File file = new File(filePath);
    XSSFWorkbook workbook;
    XSSFSheet sheet;

    if (file.exists()) {
        FileInputStream fis = new FileInputStream(file);
        workbook = new XSSFWorkbook(fis);
        sheet = workbook.getSheet("userData");
        if (sheet == null) {
            sheet = workbook.createSheet("userData");
            createHeaderUserRow(sheet);
        }
        fis.close();
    } else {
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("userData");
        createHeaderUserRow(sheet);
    }

    int lastRowNum = sheet.getLastRowNum();
    XSSFRow row = sheet.createRow(++lastRowNum);
    row.createCell(0).setCellValue(dataString[0]);
    row.createCell(1).setCellValue(dataString[1]);
    row.createCell(2).setCellValue(dataString[2]);
    row.createCell(3).setCellValue(dataString[3]);
    row.createCell(4).setCellValue(dataString[4]);
    row.createCell(5).setCellValue(dataString[5]);
    row.createCell(6).setCellValue(dataString[6]);

    FileOutputStream fos = new FileOutputStream(file);
    workbook.write(fos);
    fos.close();
    workbook.close();
} catch (IOException e) {
    System.out.println(e);
}
}

private static void createHeaderUserRow(XSSFSheet sheet) {
String[] headers = {"Id","Name", "Email", "Password", "Phone","city","prefer"};
XSSFRow headerRow = sheet.createRow(0);
for (int i = 0; i < headers.length; i++) {
    Cell cell = headerRow.createCell(i);
    cell.setCellValue(headers[i]);
}
}

	@Path("addShop")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@POST
	    public Response addNewShop(String shopDatas)
	    {  
        JSONObject json = new JSONObject(shopDatas);
        Random random=new Random();
    	String shopId= Integer.toString(random.nextInt(1000000-100000) + 100000);
      
        JSONArray shopArray = json.getJSONArray("shop");
        JSONObject shop = shopArray.getJSONObject(0);
         String shopName=shop.getString("shopName");
         String shopOpen=shop.getString("shopOpenings");
         String shopClose=shop.getString("shopClosing");
         String shopLocation=shop.getString("shopLocation");
         String shopCuisine=shop.getString("shopCuisine");
         String shopImage=shop.getString("shopImage");
         setPhotos(shopId,shopImage);
         ShopData shopItem=new ShopData(shopId,shopName,shopLocation,shopOpen,shopClose,shopCuisine);
         Gson gson = new Gson();
         List<ShopData> shopItemArray=new ArrayList<>();
         shopItemArray.add(shopItem);
         String jsonShop = gson.toJson(shopItemArray);
         
        JSONArray breakFastArray = json.getJSONArray("breakFast");
        JSONArray lunchArray = json.getJSONArray("lunch");
        JSONArray dinnerArray = json.getJSONArray("dinner");
       
        ArrayList<FoodData> breakFastDatasVeg=new ArrayList<>();
        ArrayList<FoodData> breakFastDatasNonVeg=new ArrayList<>();
       

        for (int i = 0; i < breakFastArray.length(); i++) {
            JSONObject item = breakFastArray.getJSONObject(i);
        
        	String id= Integer.toString(random.nextInt(1000000-100000) + 100000);
            String name=item.getString("itemName");
            String price=item.getString("itemPrice");
            String quantity=item.getString("itemQuantity");
            String image=item.getString("itemImage");
            String category=item.getString("itemCategory");
            FoodData food=new FoodData(id,name,quantity,price,category);
            setPhotos(id,image);
            if(category.equalsIgnoreCase("veg"))
            { 
            breakFastDatasVeg.add(food);
            	
            }
            else
            {    breakFastDatasNonVeg.add(food);
            	
            }
            
           
            
        }
        ArrayList<FoodData> lunchDatasVeg=new ArrayList<>();
        ArrayList<FoodData> lunchDatasNonVeg=new ArrayList<>();

        for (int i = 0; i < lunchArray.length(); i++) {
            JSONObject item = lunchArray.getJSONObject(i);

        
        	String id= Integer.toString(random.nextInt(1000000-100000) + 100000);
            String name=item.getString("itemName");
            String price=item.getString("itemPrice");
            String quantity=item.getString("itemQuantity");
            String category=item.getString("itemCategory");
            FoodData food=new FoodData(id,name,quantity,price,category);
            String image=item.getString("itemImage");
            setPhotos(id,image);
            if(category.equalsIgnoreCase("veg"))
            {
            	lunchDatasVeg.add(food);
            }
            else
            {
            	lunchDatasNonVeg.add(food);
            }
            
        }
        ArrayList<FoodData> dinnerDatasVeg=new ArrayList<>();
        ArrayList<FoodData> dinnerDatasNonVeg=new ArrayList<>();
        

        for (int i = 0; i < dinnerArray.length(); i++) {
            JSONObject item = dinnerArray.getJSONObject(i);

    
        	String id= Integer.toString(random.nextInt(1000000-100000) + 100000);
            String name=item.getString("itemName");
            String price=item.getString("itemPrice");
            String quantity=item.getString("itemQuantity");
            String category=item.getString("itemCategory");
            FoodData food=new FoodData(id,name,quantity,price,category);
            String image=item.getString("itemImage");
            setPhotos(id,image);
            if(category.equalsIgnoreCase("veg"))
            {
            	dinnerDatasVeg.add(food);
            }
            else
            {
            	dinnerDatasNonVeg.add(food);
            }
            
            
            
        }
       ArrayList<FoodData>allBreakFast=new ArrayList<>();
       allBreakFast.addAll(breakFastDatasVeg);
       allBreakFast.addAll(breakFastDatasNonVeg);
       ArrayList<FoodData>allLunch=new ArrayList<>();
       allLunch.addAll(lunchDatasVeg);
       allLunch.addAll(lunchDatasNonVeg);
       
       
       ArrayList<FoodData>allDinner=new ArrayList<>();
       allDinner.addAll(dinnerDatasVeg);
       allDinner.addAll(dinnerDatasNonVeg);
       
       
        String jsonAllBreakFast=gson.toJson(allBreakFast);
        String jsonAllLunch=gson.toJson(allLunch);
        String jsonAllDinner=gson.toJson(allDinner);
        String jsonBreakFastVeg = gson.toJson(breakFastDatasVeg);
        String jsonBreakFastNonVeg = gson.toJson(breakFastDatasNonVeg);
       String jsonLunchVeg=gson.toJson(lunchDatasVeg);
       String jsonLunchNonVeg=gson.toJson(lunchDatasNonVeg);
        String jsonDinnerVeg = gson.toJson(dinnerDatasNonVeg);
        String jsonDinnerNonVeg = gson.toJson(dinnerDatasNonVeg);
        String[] allDatas= {shopId,jsonShop,jsonAllBreakFast,jsonBreakFastVeg,jsonBreakFastNonVeg,jsonAllLunch,jsonLunchVeg,jsonLunchNonVeg,jsonAllDinner,jsonDinnerVeg,jsonDinnerNonVeg};
        exportShop(allDatas);

       

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", "success");
        return Response.ok(responseJson.toString(), MediaType.APPLICATION_JSON).build();
    }
	private static void setPhotos(String imageId,String image)
	{
		  
         
        
        byte[] imageBytes = Base64.getDecoder().decode(image);
          
            String imagePath = "C:\\Users\\DELL\\Desktop\\tomatoImages\\"+imageId+".jpeg";
            try (FileOutputStream fos = new FileOutputStream(imagePath)) {
                fos.write(imageBytes);
            }
            catch(Exception e)
            {
            	System.out.println(e);
            }
	}
	
	private static void createHeaderRow(XSSFSheet sheet) {
		  String[] headers = {"shopID","shopData", "breakFast","breakFastVeg","breakFastNonVeg","lunch","lunchVeg","lunchNonVeg","dinner","dinnerVeg","dinnerNonVeg"};
	  
	       XSSFRow headerRow = sheet.createRow(0);
	      for (int i = 0; i < headers.length; i++) {
	        XSSFCell cell = headerRow.createCell(i);
	       cell.setCellValue(headers[i]);
	    }
	}
	    

	public void exportShop(String[] shop)
	{
		
				try
				{
				String filePath="C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
			    File file = new File(filePath);
			    XSSFWorkbook workbook;
			    XSSFSheet sheet;
	            if (file.exists()) {
	                FileInputStream fis = new FileInputStream(file);
	                workbook = new XSSFWorkbook(fis);
	                sheet = workbook.getSheet("shopData");
	                if (sheet == null) {
	                    sheet = workbook.createSheet("shopData");
	                    createHeaderRow(sheet);
	                }
	                fis.close();
	            } else {
	                workbook = new XSSFWorkbook();
	                sheet = workbook.createSheet("shopData");
	                createHeaderRow(sheet);
	            }

	            int lastRowNum = sheet.getLastRowNum();
	            XSSFRow row = sheet.createRow(++lastRowNum);
	           
	            int cellNo=0;         
	            row.createCell(cellNo++).setCellValue(shop[0]);
	            row.createCell(cellNo++).setCellValue(shop[1]);
	            row.createCell(cellNo++).setCellValue(shop[2]);
	            row.createCell(cellNo++).setCellValue(shop[3]);
	            row.createCell(cellNo++).setCellValue(shop[4]);
	            row.createCell(cellNo++).setCellValue(shop[5]);
	            row.createCell(cellNo++).setCellValue(shop[6]);
	            row.createCell(cellNo++).setCellValue(shop[7]);
	            row.createCell(cellNo++).setCellValue(shop[8]);
	            row.createCell(cellNo++).setCellValue(shop[9]);
	            row.createCell(cellNo++).setCellValue(shop[10]);
	           

	            FileOutputStream fos1 = new FileOutputStream(file);
	            workbook.write(fos1);
	            fos1.close();
	            workbook.close();
	        } catch (IOException e) {
	            System.out.println(e);
	        }
	        }
	

    private  byte[] readFileToByteArray(String filePath) throws IOException {
        File file = new File(filePath);
        try (FileInputStream fis = new FileInputStream(file);
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
            }
            return bos.toByteArray();
        }
    }

    
    
    @Path("getShopData")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response returnShopDatas() {
            try {
                String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
                File file = new File(filePath);

              
                ArrayList<GetShopData> allShopFoodDatas=new ArrayList<>();

                if (file.exists()) {
                    FileInputStream fis = new FileInputStream(file);
                    XSSFWorkbook workbook = new XSSFWorkbook(fis);
                    XSSFSheet sheet = workbook.getSheet("shopData");
                
                    if (sheet != null) {
                        int lastRowNum = sheet.getLastRowNum();
                        for (int i = 1; i <= lastRowNum; i++) {
                        	  ArrayList<ShopData> shopList = new ArrayList<>();
                              ArrayList<FoodData> breakfastList = new ArrayList<>();
                              ArrayList<FoodData> lunchList = new ArrayList<>();
                              ArrayList<FoodData> dinnerList = new ArrayList<>();
                            XSSFRow row = sheet.getRow(i);

                            String shopDataJson = row.getCell(1).getStringCellValue();
                            String breakFastDataJson = row.getCell(2).getStringCellValue();
                            String lunchDataJson = row.getCell(5).getStringCellValue();
                            String dinnerDataJson = row.getCell(8).getStringCellValue();

                            Gson gson = new Gson();

                            // Deserialize shop data
                            java.lang.reflect.Type shopDataType = new TypeToken<ArrayList<ShopData>>() {}.getType();
                            List<ShopData> shopData = gson.fromJson(shopDataJson, shopDataType);

                            // Deserialize food data
                            java.lang.reflect.Type foodDataType = new TypeToken<ArrayList<FoodData>>() {}.getType();
                            List<FoodData> breakfastData = gson.fromJson(breakFastDataJson, foodDataType);
                            List<FoodData> lunchData = gson.fromJson(lunchDataJson, foodDataType);
                            List<FoodData> dinnerData = gson.fromJson(dinnerDataJson, foodDataType);

                            // Add image to shop data
                            String shopImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + shopData.get(0).getShopId() + ".jpeg");
                            shopData.get(0).setShopImage(shopImage); // Assuming ShopData has a setShopImage method

                            // Add image to food data
                            for (FoodData foodData : breakfastData) {
                                String foodImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + foodData.getItemId() + ".jpeg");
                                foodData.setItemImage(foodImage);
                            }
                         // Add image to food data
                            for (FoodData foodData : lunchData) {
                                String foodImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + foodData.getItemId() + ".jpeg");
                                foodData.setItemImage(foodImage);
                            }// Add image to food data
                            for (FoodData foodData : dinnerData) {
                                String foodImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + foodData.getItemId() + ".jpeg");
                                foodData.setItemImage(foodImage);
                            }
                            // Add data to lists
                            shopList.addAll(shopData);
                            breakfastList.addAll(breakfastData);
                            lunchList.addAll(lunchData);
                            dinnerList.addAll(dinnerData);
                            GetShopData getShopData = new GetShopData(shopList, breakfastList, lunchList, dinnerList);
                            allShopFoodDatas.add(getShopData);
                        }
                    }

                    fis.close();
                    workbook.close();
                }

               System.out.println(allShopFoodDatas);
                Gson gson = new Gson();
                String jsonResponse = gson.toJson(allShopFoodDatas);

                return Response.ok(jsonResponse, MediaType.APPLICATION_JSON).build();
            } catch (IOException e) {
                e.printStackTrace();
                JSONObject responseJson = new JSONObject();
                responseJson.put("message", "failure");
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseJson.toString()).build();
            }
        }

        private String getImageFromPath(String imagePath) {
            try {
                byte[] imageBytes = readFileToByteArray(imagePath);
                return Base64.getEncoder().encodeToString(imageBytes);
            } catch (IOException e) {
                e.printStackTrace();
                return "";
            }
        }

        @Path("getFoodUserData")
        @Consumes(MediaType.APPLICATION_JSON)
        @Produces(MediaType.APPLICATION_JSON)
        @GET
        public Response returnFoodData(@QueryParam("param1") String param1) {
        	int index=0;
        	if(param1.equalsIgnoreCase("breakFast"))
        	{
        		index=2;
        	}
        	else if(param1.equalsIgnoreCase("lunch"))
        	{
        		index=5;
        	}
        	else if(param1.equalsIgnoreCase("dinner"))
        	{
        		index=8;
        		System.out.println("Dat");
        	}
        	
                try {
                    String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
                    File file = new File(filePath);
                    
                    ArrayList<FoodData> allFoodDatas=new ArrayList<>();
                    ArrayList<ShopData> shopList = new ArrayList<>();

                    if (file.exists()) {
                        FileInputStream fis = new FileInputStream(file);
                        XSSFWorkbook workbook = new XSSFWorkbook(fis);
                        XSSFSheet sheet = workbook.getSheet("shopData");
                       
                        ArrayList<FoodData> vegDatasList=new ArrayList<>();
                        ArrayList<FoodData> nonVegDatasList=new ArrayList<>();
                      
                        if (sheet != null) {
                            int lastRowNum = sheet.getLastRowNum();
                            for (int i = 1; i <= lastRowNum; i++) {
                            	 List<FoodData> nonVegData=new ArrayList<>();
                                 List<FoodData> vegData=new ArrayList<>();
                               
                                XSSFRow row = sheet.getRow(i);
                                Gson gson = new Gson();
                           
                                if(index==2 || index==5 ||index==8 )
                                {  int indexAccess=index;
                                	String foodDataJsonVeg = row.getCell(++indexAccess).getStringCellValue();
                                System.out.println(foodDataJsonVeg);
                                String foodDataJsonNonVeg = row.getCell(++indexAccess).getStringCellValue();
                                  java.lang.reflect.Type foodDataType = new TypeToken<ArrayList<FoodData>>() {}.getType();
                                   vegData = gson.fromJson(foodDataJsonVeg, foodDataType);
                                   nonVegData = gson.fromJson(foodDataJsonNonVeg, foodDataType);	
                                }
                                String shopId = row.getCell(0).getStringCellValue();
                                String shopDataJson = row.getCell(1).getStringCellValue();
                                java.lang.reflect.Type shopDataType = new TypeToken<ArrayList<ShopData>>() {}.getType();
                                List<ShopData> shopData = gson.fromJson(shopDataJson, shopDataType);
                                
                                String shopImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + shopData.get(0).getShopId() + ".jpeg");
                                shopData.get(0).setShopImage(shopImage); 
                                String shopName=shopData.get(0).getShopName();

                                
                                for (FoodData foodData : vegData) {
                                    String foodImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + foodData.getItemId() + ".jpeg");
                                    foodData.setItemImage(foodImage);
                                    foodData.setShopId(shopId);
                                    foodData.setShopName(shopName);
                                }
                                for (FoodData foodData : nonVegData) {
                                    String foodImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + foodData.getItemId() + ".jpeg");
                                    foodData.setItemImage(foodImage);
                                    foodData.setShopId(shopId);
                                    foodData.setShopName(shopName);
                                }
                               
                                shopList.addAll(shopData);
                                vegDatasList.addAll(vegData);
                                nonVegDatasList.addAll(nonVegData); 
                               
                            }
                            allFoodDatas.addAll(vegDatasList);
                            allFoodDatas.addAll(nonVegDatasList);
                           
                            
                        }

                        fis.close();
                        workbook.close();
                    }
                    

                    GetShopData getShopData = new GetShopData(shopList,allFoodDatas);
                    Gson gson = new Gson();
                    String jsonResponse = gson.toJson(getShopData);
                    return Response.ok(jsonResponse, MediaType.APPLICATION_JSON).build();
                } catch (IOException e) {
                    e.printStackTrace();
                    JSONObject responseJson = new JSONObject();
                    responseJson.put("message", "failure");
                    return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseJson.toString()).build();
                }
            }

        @Path("addToCart")
        @Consumes(MediaType.APPLICATION_JSON)
        @Produces(MediaType.APPLICATION_JSON)
        @POST
        

            public Response getCartProduct(String food) {
                JSONObject json = new JSONObject(food);
                String customerId = json.getString("userId");
                String cart = json.getString("foodData");
                String[] data = cart.split(",");

                String shopId = data[0];
                String shopName = data[1];
                String foodId = data[2];
                String foodName = data[3];
                String foodPrice = data[4];
                String foodQuantity = data[5];
                CartData cartItems = new CartData(shopId, shopName, foodId, foodName, foodQuantity, foodPrice);
                System.out.println(cartItems);

                String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
                File file = new File(filePath);

                try (XSSFWorkbook workbook = file.exists() ? new XSSFWorkbook(new FileInputStream(file)) : new XSSFWorkbook()) {
                    XSSFSheet sheet = workbook.getSheet("cartData");
                    if (sheet == null) {
                        sheet = workbook.createSheet("cartData");
                        createCartHeaderRow(sheet);
                    }

                    int lastRowNum = sheet.getLastRowNum();
                    System.out.println(lastRowNum);
                    boolean addRowCondition = true;

                    for (int i = 1; i <= lastRowNum; i++) {
                        XSSFRow getRow = sheet.getRow(i);
                        String id = getRow.getCell(0).getStringCellValue();
                        Gson gson1 = new Gson();

                        if (id.equals(customerId)) {
                            List<CartData> cartList;
                            Cell cell = getRow.getCell(1);
                            if (cell == null) {
                                cartList = new ArrayList<>();
                            } else {
                                String cartDatas = cell.getStringCellValue();
                                java.lang.reflect.Type cartListType = new TypeToken<ArrayList<CartData>>() {}.getType();
                                cartList = gson1.fromJson(cartDatas, cartListType);
                            }

                            for (CartData one : cartList) {
                                if (one.foodId.equals(foodId)) {
                                    JSONObject responseJson = new JSONObject();
                                    responseJson.put("message", "failure");
                                    return Response.ok(responseJson.toString(), MediaType.APPLICATION_JSON).build();
                                }
                            }

                            cartList.add(cartItems);
                            String jsonData = new Gson().toJson(cartList);
                            if (cell == null) {
                                getRow.createCell(1).setCellValue(jsonData);
                            } else {
                                cell.setCellValue(jsonData);
                            }
                            addRowCondition = false;
                            break;
                        }
                    }

                    if (addRowCondition) {
                        XSSFRow row = sheet.createRow(++lastRowNum);
                        row.createCell(0).setCellValue(customerId);

                        List<CartData> cartList = new ArrayList<>();
                        cartList.add(cartItems);
                        String jsonData = new Gson().toJson(cartList);
                        row.createCell(1).setCellValue(jsonData);
                    }

                    try (FileOutputStream fos1 = new FileOutputStream(file)) {
                        workbook.write(fos1);
                    }
                } catch (IOException e) {
                    System.out.println(e);
                }

                JSONObject responseJson = new JSONObject();
                responseJson.put("message", "success");
                return Response.ok(responseJson.toString(), MediaType.APPLICATION_JSON).build();
            }

public static void createCartHeaderRow(XSSFSheet Sheet)
{
	 String[] headers = {"Customer ID","CartProducts"};
	  
     XSSFRow headerRow = Sheet.createRow(0);
    for (int i = 0; i < headers.length; i++) {
      XSSFCell cell = headerRow.createCell(i);
      cell.setCellValue(headers[i]);
  }
}
@Path("getCartData")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@POST
 public Response returnCartProducts(String id) {
       
        JSONObject responseJson = new JSONObject();
        List<CartData> carts = new ArrayList<>();
        System.out.println("My Get Product");

        try
		{
		String filePath="C:\\Users\\DELL\\Desktop\\TomatoExcel.xlsx";
	    File file = new File(filePath);
	    
	    XSSFWorkbook workbook = null;
	    XSSFSheet sheet=null;
    	 if (file.exists()) {
             FileInputStream fis = new FileInputStream(file);
             workbook = new XSSFWorkbook(fis);
             sheet = workbook.getSheet("cartData");
             if (sheet == null) {
                 
                 
             }
             fis.close();
         } else {
             
         }

         int lastRowNum = sheet.getLastRowNum();
         System.out.println(lastRowNum);
         String cartDataJson = null;
         List<CartData> cartDatas=new ArrayList<>();
         for(int i=1;i<=lastRowNum;i++)
         {XSSFRow getRow=sheet.getRow(i);
         String customerId=getRow.getCell(0).getStringCellValue();
   
         
         if(id.equals(customerId))
         {
        	 Gson gson=new Gson();
        	 List<CartData> cartList=new ArrayList<>();
        	 Cell checkCell=getRow.getCell(1);
        	 if (checkCell != null && checkCell.getCellType() != CellType.BLANK)
        	 {
        		 
        		 cartDataJson=getRow.getCell(1).getStringCellValue();
           	     java.lang.reflect.Type cartDataType = new TypeToken<ArrayList<CartData>>() {}.getType();
                 cartDatas = gson.fromJson(cartDataJson, cartDataType);
                 Cell checkCouponCell=getRow.getCell(2);
                 String couponString;
                 ArrayList<String> coupons;
                 String couponId=null;
                 if(checkCouponCell != null && checkCouponCell.getCellType() != CellType.BLANK)
                 {
                	 couponString = checkCouponCell.getStringCellValue();
                     java.lang.reflect.Type couponListType = new TypeToken<ArrayList<String>>() {}.getType();
                      coupons = gson.fromJson(couponString, couponListType);
                      couponId=coupons.get(0).split(",")[1];
                      
                      
                 }
                 
                 for (CartData cartData : cartDatas) {
                     String foodImage = getImageFromPath("C:\\Users\\DELL\\Desktop\\tomatoImages\\" + cartData.foodId + ".jpeg");
                     cartData.setItemImage(foodImage);
                     cartData.setCoupon(couponId);
                 }
                 carts.addAll(cartDatas);
           	  
           	
            }
            
            workbook.close();
            System.out.println(carts);
            String jsonResponse = gson.toJson(carts);
           
            return Response.ok(jsonResponse, MediaType.APPLICATION_JSON).build();
        	 }
        	 
         }
         
        
       
    	
     
     } catch (IOException e) {
         System.out.println(e);
     }
    	JSONObject responseJson1=new JSONObject();
    	responseJson1.put("message","failure");
       
    	return Response.ok(responseJson1.toString(),MediaType.APPLICATION_JSON).build();
     
        
}  


@Path("updateCart")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PUT
    public Response getUpdateCart(String cart)
    {  
	System.out.println(cart);
    	JSONObject json=new JSONObject(cart);
    	




try {
String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
File file = new File(filePath);
FileInputStream fis = new FileInputStream(file);
XSSFWorkbook workbook = new XSSFWorkbook(fis);
XSSFSheet sheet = workbook.getSheet("cartData");

for (int i = 1; i <= sheet.getLastRowNum(); i++) { 
    XSSFRow row = sheet.getRow(i);

    if (row == null) continue;

    String id = row.getCell(0).getStringCellValue();
    System.out.println(id);
    if(id.equals(json.getString("userId")))
    {
    	String cartDatas=row.getCell(1).getStringCellValue();
    	 java.lang.reflect.Type cartListType = new TypeToken<ArrayList<CartData>>() {}.getType();
   	    Gson gson1 = new Gson();
        List<CartData> cartFromJson = gson1.fromJson(cartDatas, cartListType);
        for(CartData data:cartFromJson)
        {
        	if(data.foodId.equals(json.getString("foodId")))
        			{
        		         data.setQuantity(json.getString("quantity"));
        			}
        }
        Gson gson = new Gson();
        String jsonData = gson.toJson(cartFromJson);
        row.createCell(1).setCellValue(jsonData);

    	
    	
    }
}
FileOutputStream fos1 = new FileOutputStream(file);
workbook.write(fos1);
fos1.close();
workbook.close();
} catch (IOException e) {
System.out.println(e);
}
JSONObject responseJson=new JSONObject();
responseJson.put("message","success");
return Response.ok(responseJson.toString(),MediaType.APPLICATION_JSON).build();
}

   

@Path("deleteCart")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@DELETE
    public Response deleteCartProduct(String food)
    {  
	System.out.println(food);
    	JSONObject json=new JSONObject(food);
    	




try {
String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
File file = new File(filePath);
FileInputStream fis = new FileInputStream(file);
XSSFWorkbook workbook = new XSSFWorkbook(fis);
XSSFSheet sheet = workbook.getSheet("cartData");
			
			for (int i = 1; i <= sheet.getLastRowNum(); i++) { 
			    XSSFRow row = sheet.getRow(i);
			
			    if (row == null) continue;
			
			    String id = row.getCell(0).getStringCellValue();
			    System.out.println(id);
			    if(id.equals(json.getString("userId")))
			    {
			    	String cartDatas=row.getCell(1).getStringCellValue();
			    	 java.lang.reflect.Type cartListType = new TypeToken<ArrayList<CartData>>() {}.getType();
			   	    Gson gson1 = new Gson();
			        List<CartData> cartFromJson = gson1.fromJson(cartDatas, cartListType);
			        Iterator<CartData> it=cartFromJson.iterator();
			         while(it.hasNext())
			         {
			        	 CartData data=it.next();
			        	if(data.foodId.equals(json.getString("foodId")))
			        			{
			        		         it.remove();
			        		         
			        			}
			         }
			        
			        Gson gson = new Gson();
			        String jsonData = gson.toJson(cartFromJson);
			        row.createCell(1).setCellValue(jsonData);
			
			    }
			    	
			    }

FileOutputStream fos1 = new FileOutputStream(file);
workbook.write(fos1);
fos1.close();
workbook.close();
} catch (IOException e) {
System.out.println(e);
}
JSONObject responseJson=new JSONObject();
responseJson.put("message","success");
return Response.ok(responseJson.toString(),MediaType.APPLICATION_JSON).build();
}


@Path("deleteCartFully")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@DELETE
public Response deleteCartProductFully(String data) {
    System.out.println(data);
    JSONObject json = new JSONObject(data);
    String userId = json.getString("userId");
    String coupon = json.getString("coupon");
    Integer numberCoupon = null;

    String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
    File file = new File(filePath);

    try (FileInputStream fis = new FileInputStream(file);
         XSSFWorkbook workbook = new XSSFWorkbook(fis)) {

        XSSFSheet sheet = workbook.getSheet("cartData");

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            XSSFRow row = sheet.getRow(i);

            if (row == null) continue;

            String id = row.getCell(0).getStringCellValue();
            System.out.println(id);

            if (id.equals(userId)) {
                Cell removeCell = row.getCell(1);
                if (removeCell != null) {
                    row.removeCell(removeCell);
                }

                if ("yes".equalsIgnoreCase(coupon)) {
                    Cell couponCell = row.getCell(2);
                    List<String> couponFromJson;
                    Gson gson = new Gson();

                    if (couponCell != null && couponCell.getCellType() != CellType.BLANK) {
                        String couponString = couponCell.getStringCellValue();
                        java.lang.reflect.Type couponListType = new TypeToken<ArrayList<String>>() {}.getType();
                        couponFromJson = gson.fromJson(couponString, couponListType);
                    } else {
                        couponFromJson = new ArrayList<>();
                        couponCell = row.createCell(2);
                    }

                    Random random = new Random();
                    numberCoupon = random.nextInt(1000000, 9999999);
                    couponFromJson.add("coupon" + "," + numberCoupon);
                    String jsonData = gson.toJson(couponFromJson);
                    couponCell.setCellValue(jsonData);
                }

                break;
            }
        }

        try (FileOutputStream fos = new FileOutputStream(file)) {
            workbook.write(fos);
        }
    } catch (IOException e) {
        System.out.println(e);
    }

    JSONObject responseJson = new JSONObject();
    responseJson.put("message", numberCoupon != null ? numberCoupon.toString() : "success");
    return Response.ok(responseJson.toString(), MediaType.APPLICATION_JSON).build();
}


@Path("deleteCoupon")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@DELETE
public Response deleteCouponInUser(String data) {
    JSONObject responseJson = new JSONObject();
    
    try {
        // Parse input JSON
        JSONObject json = new JSONObject(data);
        Gson gson = new Gson();
        String userId = json.getString("userId");
        String couponId = json.getString("couponId");
        
        // Validate input
        if (userId == null || userId.isEmpty() || couponId == null || couponId.isEmpty()) {
            responseJson.put("message", "Invalid input: userId and couponId are required.");
            return Response.status(Response.Status.BAD_REQUEST).entity(responseJson.toString()).build();
        }
        
        String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
        File file = new File(filePath);
        
        // Synchronized block to prevent concurrent access issues
        synchronized (this) {
            try (FileInputStream fis = new FileInputStream(file);
                 XSSFWorkbook workbook = new XSSFWorkbook(fis)) {
                XSSFSheet sheet = workbook.getSheet("cartData");

                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    XSSFRow row = sheet.getRow(i);
                    if (row == null) continue;

                    String id = row.getCell(0).getStringCellValue();
                    if (id.equals(userId)) {
                        Cell couponCell = row.getCell(2);
                        if (couponCell != null && couponCell.getCellType() != CellType.BLANK) {
                            String couponString = couponCell.getStringCellValue();
                            java.lang.reflect.Type couponListType = new TypeToken<ArrayList<String>>() {}.getType();
                            ArrayList<String> coupons = gson.fromJson(couponString, couponListType);
                            String jsonData = gson.toJson(coupons);
                            couponCell.setCellValue(jsonData);
                                
                              
                                try (FileOutputStream fos = new FileOutputStream(file)) {
                                    workbook.write(fos);
                                }
                                
                                responseJson.put("message", "success");
                            
                        }
                    }
                }
            } catch (FileNotFoundException e) {
                responseJson.put("message", "File not found: " + e.getMessage());
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseJson.toString()).build();
            } catch (IOException e) {
                responseJson.put("message", "Error reading/writing file: " + e.getMessage());
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseJson.toString()).build();
            }
        }
        
    } catch (Exception e) {
        responseJson.put("message", "Error processing request: " + e.getMessage());
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseJson.toString()).build();
    }
    
    return Response.ok(responseJson.toString(), MediaType.APPLICATION_JSON).build();
}


@Path("addOrderData")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@POST


    public Response setOrderData(String order) {
        JSONObject json = new JSONObject(order);
        String customerId = json.getString("userId");
        JSONArray orderData = json.getJSONArray("orderData");
        System.out.println(orderData);
          

      
//        CartData cartItems = new CartData(shopId, shopName, foodId, foodName, foodQuantity, foodPrice);
//        System.out.println(cartItems);
//
//        String filePath = "C:\\Users\\DELL\\Desktop\\tomatoExcel.xlsx";
//        File file = new File(filePath);
//
//        try (XSSFWorkbook workbook = file.exists() ? new XSSFWorkbook(new FileInputStream(file)) : new XSSFWorkbook()) {
//            XSSFSheet sheet = workbook.getSheet("cartData");
//            if (sheet == null) {
//                sheet = workbook.createSheet("cartData");
//                createCartHeaderRow(sheet);
//            }
//
//            int lastRowNum = sheet.getLastRowNum();
//            System.out.println(lastRowNum);
//            boolean addRowCondition = true;
//
//            for (int i = 1; i <= lastRowNum; i++) {
//                XSSFRow getRow = sheet.getRow(i);
//                String id = getRow.getCell(0).getStringCellValue();
//                Gson gson1 = new Gson();
//
//                if (id.equals(customerId)) {
//                    List<CartData> cartList;
//                    Cell cell = getRow.getCell(1);
//                    if (cell == null) {
//                        cartList = new ArrayList<>();
//                    } else {
//                        String cartDatas = cell.getStringCellValue();
//                        java.lang.reflect.Type cartListType = new TypeToken<ArrayList<CartData>>() {}.getType();
//                        cartList = gson1.fromJson(cartDatas, cartListType);
//                    }
//
//                    for (CartData one : cartList) {
//                        if (one.foodId.equals(foodId)) {
//                            JSONObject responseJson = new JSONObject();
//                            responseJson.put("message", "failure");
//                            return Response.ok(responseJson.toString(), MediaType.APPLICATION_JSON).build();
//                        }
//                    }
//
//                    cartList.add(cartItems);
//                    String jsonData = new Gson().toJson(cartList);
//                    if (cell == null) {
//                        getRow.createCell(1).setCellValue(jsonData);
//                    } else {
//                        cell.setCellValue(jsonData);
//                    }
//                    addRowCondition = false;
//                    break;
//                }
//            }
//
//            if (addRowCondition) {
//                XSSFRow row = sheet.createRow(++lastRowNum);
//                row.createCell(0).setCellValue(customerId);
//
//                List<CartData> cartList = new ArrayList<>();
//                cartList.add(cartItems);
//                String jsonData = new Gson().toJson(cartList);
//                row.createCell(1).setCellValue(jsonData);
//            }
//
//            try (FileOutputStream fos1 = new FileOutputStream(file)) {
//                workbook.write(fos1);
//            }
//        } catch (IOException e) {
//            System.out.println(e);
//        }

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", "success");
        return Response.ok(responseJson.toString(), MediaType.APPLICATION_JSON).build();
    }

//public static void createCartHeaderRow(XSSFSheet Sheet)
//{
//String[] headers = {"Customer ID","CartProducts"};
//
//XSSFRow headerRow = Sheet.createRow(0);
//for (int i = 0; i < headers.length; i++) {
//XSSFCell cell = headerRow.createCell(i);
//cell.setCellValue(headers[i]);
//}
//}
}
	



           
            
        
        

       
    




	


