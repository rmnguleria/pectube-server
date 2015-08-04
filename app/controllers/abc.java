package com.theraiway.login_demo;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.theraiway.database.User;
import com.theraiway.helper.MySingleton;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


/**
 * A placeholder fragment containing a simple view.
 */
public class ClubDetailFragment extends Fragment {

    TextView title ;
    ImageView imageIcon;
    TextView description ;
    TextView activities ;
    TextView achievements ;
    TextView heads ;

    public ClubDetailFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_club_detail, container, false);

        final String jsonString ;
        SharedPreferences mySharedPreferences = getActivity().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE);
        jsonString = mySharedPreferences.getString("jsonObject","");


        title = (TextView) rootView.findViewById(R.id.title);
        imageIcon = (ImageView) rootView.findViewById(R.id.imageIcon);
        description = (TextView) rootView.findViewById(R.id.description);
        activities = (TextView) rootView.findViewById(R.id.activities);
        achievements = (TextView) rootView.findViewById(R.id.achievements);
        heads = (TextView) rootView.findViewById(R.id.heads);

        Intent intent = getActivity().getIntent();

        title.setText(intent.getStringExtra("CLUB_NAME"));
        title.setTextColor(Color.MAGENTA);
        imageIcon.setImageResource(intent.getIntExtra("CLUB_IMAGE", R.drawable.ic_launcher));
        description.setText(intent.getStringExtra("CLUB_DESCRIPTION"));
        description.setTextColor(Color.GREEN);
        activities.setText(getConcatenatedList(intent.getStringArrayListExtra("CLUB_ACTIVITIES")));
        activities.setTextColor(Color.RED);
        achievements.setText(getConcatenatedList(intent.getStringArrayListExtra("CLUB_ACHIEVEMENTS")));
        achievements.setTextColor(Color.BLUE);
        heads.setText(getConcatenatedList(intent.getStringArrayListExtra("CLUB_HEADS")));

        final String club_id = intent.getStringExtra("CLUB_ID");
        Button joinClub = (Button)rootView.findViewById(R.id.joinClub);
        joinClub.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ConnectivityManager cm =
                        (ConnectivityManager)getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);

                NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
                boolean isConnected = activeNetwork != null && activeNetwork.isConnectedOrConnecting();

                if(!isConnected){
                    Toast.makeText(getActivity(), "Your internet doesn't seem to be working", Toast.LENGTH_LONG).show();
                    return;
                }
            }


            User user = MainActivity.getUserObject(jsonString);

            String urlString = "http://"+MainActivity.SERVER_IP+"/users/"+user.getUserId()+"/joinclub";

            StringRequest stringRequest = new StringRequest(Request.Method.PUT, urlString, new Response.Listener<String>() {
                @Override
                public void onResponse(String s) {

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError volleyError) {

                }
            }){
                @Override
                protected Map<String, String> getParams() throws AuthFailureError {
                    Map<String,String> params = new HashMap<>();
                    params.put("club_id",club_id);
                    return params;
                }
            };

            RequestQueue requestQueue = MySingleton.getInstance(getActivity()).getRequestQueue();
        });

        return rootView;
    }

    private String getConcatenatedList(ArrayList<String> arrayList) {
        StringBuilder stringBuilder = new StringBuilder("");
        for(String string : arrayList){
            stringBuilder.append(string + "\n");
        }
        return stringBuilder.toString();
    }
}
