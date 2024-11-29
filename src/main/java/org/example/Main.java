package org.example;



import com.fastcgi.FCGIInterface;

import java.util.*;

public class Main {
    public static void main(String[] args) {
        FCGIInterface fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {

            Properties requestParams = FCGIInterface.request.params;
            String method = (String) requestParams.get("REQUEST_METHOD");
            String queryString = (String) requestParams.get("QUERY_STRING");

            try {
                if (method.equals("GET")) {
                    String out = createGetJson(queryString);

                    System.out.println(out);
                } else {
                    System.out.println(error404HTML());
                }
            }catch (Exception e){
                System.out.println(error404HTML());
            }
        }
    }

    private static String jsonHeader() {
        return "Content-type:application/json\n";
    }

    private static String createGetJson(String qs) {
        String[] values = qs.split("&"); // ["x=3", "y=1"]
        Map<String, Float> map = new HashMap<>();

        try {
            for (String entry : values) {
                String[] parts = entry.split("="); // ["x", "3"]
                if (parts.length == 2) {
                    try {
                        map.put(parts[0], Float.valueOf(parts[1]));
                    } catch (Exception e) {
                        return error404HTML();
                    }
                }

            }
        }catch (Exception e){
            return error404HTML();
        }
        Integer x;
        Float y;
        Float r;
        try {
            x = map.get("x").intValue();
            y = map.get("y");
            r = map.get("r");
        } catch (Exception e) {
            return error404HTML();
        }

        if (!validate(x, y, r)) {
            return error404HTML();
        }

        boolean areaCheck = areaCheck(x, y, r);
        String json = jsonHeader() +
                "\n{\"x\": %d, \"y\": %f, \"r\": %f, \"hit\": %b}\n".formatted(x, y, r, areaCheck);

        return json;
    }

    private static boolean validate(Integer x, Float y, Float r) {
        if (x < -4 || x > 4) return false;
        if (y < -10 || y > 10) return false;
        if (r < -10 || r > 10) return false;
        return true;
    }

    private static boolean areaCheck(Integer x, Float y, Float r) {
        if (x > 0 && y > 0) {
            return (-x + r) / 2 >= y;
        } else if (x > 0 && y < 0) {
            return false;
        } else if (x < 0 && y > 0) {
            return (x * x + y * y) < r * r;
        } else if (x < 0 && y < 0) {
            return x >= -r && y >= -r / 2;
        }
        return false;
    }


    private static String error404HTML() {
        String out = jsonHeader() +
                "\n{\"error\": \"ERROR\"}\n";
        return out;
    }
}

// mvn install:install-file -Dfile=src/main/resources/fastcgi-lib.jar -DgroupId=com.fastcgi -DartifactId=fastcgi -Dversion=1.0.0 -Dpackaging=jar
