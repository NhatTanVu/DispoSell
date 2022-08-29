package DispoSell.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TrackingInfo {
    @NotNull
    private long deliveryID;

    @NotNull
    private double lat;

    @NotNull
    private double lng;

    @NotNull
    private String sessionID;
}
